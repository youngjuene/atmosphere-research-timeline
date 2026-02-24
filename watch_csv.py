#!/usr/bin/env python3
"""
watch_csv.py — Watches atmosphere_timeline_dataset.json for changes,
validates format, then runs update_data.py only if the file is clean.

Usage:
    python watch_csv.py

Ctrl+C to stop.
"""

import json
import os
import subprocess
import sys
import time

from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

JSON_FILE = os.path.join(os.path.dirname(__file__), 'atmosphere_timeline_dataset.json')
UPDATE_SCRIPT = os.path.join(os.path.dirname(__file__), 'update_data.py')

VALID_BROAD_TRACKS = {
    'Philosophy',
    'Urban Studies',
    'Architecture',
    'Computation',
}

VALID_SUB_TRACKS = {
    'Aesthetics',
    'Phenomenology',
    'Spatial Theory',
    'Sensory Studies',
    'Environmental Psychology',
    'Cultural Studies',
    'Architectural Theory',
    'Urban Systems',
}

REQUIRED_FIELDS = {'work_id', 'year', 'broad_track', 'sub_track', 'authors', 'short_title', 'full_title'}


def validate_json(filepath):
    """Returns a list of error strings. Empty list means the file is valid."""
    errors = []

    try:
        with open(filepath, encoding='utf-8') as f:
            content = f.read().strip()

        if not content:
            return ['File is empty.']

        try:
            records = json.loads(content)
        except json.JSONDecodeError as e:
            return [f"Invalid JSON: {e}"]

        if not isinstance(records, list):
            return ['Top-level value must be a JSON array.']

        seen_ids = {}
        for i, record in enumerate(records):
            label = f"Entry {i + 1} ({record.get('work_id', '?')})"

            # required fields must be present and non-empty
            for field in REQUIRED_FIELDS:
                val = record.get(field)
                if val is None:
                    errors.append(f"{label}: missing field '{field}'")
                elif isinstance(val, str) and not val.strip():
                    errors.append(f"{label}: '{field}' is empty")

            # year must be an integer
            year = record.get('year')
            if year is not None and not isinstance(year, int):
                errors.append(f"{label}: 'year' must be an integer, got {json.dumps(year)}")

            # broad_track must be a known value
            bt = record.get('broad_track', '')
            if bt and bt not in VALID_BROAD_TRACKS:
                errors.append(
                    f"{label}: unknown broad_track '{bt}' "
                    f"(valid: {', '.join(sorted(VALID_BROAD_TRACKS))})"
                )

            # sub_track must be a known value
            st = record.get('sub_track', '')
            if st and st not in VALID_SUB_TRACKS:
                errors.append(
                    f"{label}: unknown sub_track '{st}' "
                    f"(valid: {', '.join(sorted(VALID_SUB_TRACKS))})"
                )

            # work_id must be unique
            wid = record.get('work_id', '')
            if wid:
                if wid in seen_ids:
                    errors.append(
                        f"{label}: duplicate work_id '{wid}' "
                        f"(first seen at entry {seen_ids[wid]})"
                    )
                else:
                    seen_ids[wid] = i + 1

    except Exception as exc:
        errors.append(f"Could not read file: {exc}")

    return errors


def run_update():
    result = subprocess.run(
        [sys.executable, UPDATE_SCRIPT],
        capture_output=True, text=True,
    )
    if result.returncode == 0:
        print(f"  ✓ {result.stdout.strip() or 'data.js updated'}")
    else:
        print(f"  ✗ update_data.py failed:\n{result.stderr.strip()}")


class JSONHandler(FileSystemEventHandler):
    DEBOUNCE = 0.8  # seconds — ignore rapid saves while still typing

    def __init__(self):
        self._last_trigger = 0

    def on_modified(self, event):
        if os.path.abspath(event.src_path) != os.path.abspath(JSON_FILE):
            return

        now = time.time()
        if now - self._last_trigger < self.DEBOUNCE:
            return
        self._last_trigger = now

        print(f"\n{'─' * 52}")
        print("JSON saved — checking format...")

        errors = validate_json(JSON_FILE)

        if errors:
            print(f"  ✗ {len(errors)} problem(s) found — fix before the browser reflects changes:\n")
            for e in errors:
                print(f"    • {e}")
            print("\n  Fix the issues above and save again.")
        else:
            print("  ✓ Valid — Vite will hot-reload the browser automatically.")


if __name__ == '__main__':
    if not os.path.exists(JSON_FILE):
        print(f"Error: JSON not found at {JSON_FILE}")
        sys.exit(1)

    handler = JSONHandler()
    observer = Observer()
    observer.schedule(handler, path=os.path.dirname(JSON_FILE) or '.', recursive=False)
    observer.start()

    print(f"Watching  {os.path.basename(JSON_FILE)}")
    print(f"Validating on every save — Vite hot-reloads the browser automatically.")
    print(f"Press Ctrl+C to stop.\n")

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        pass
    finally:
        observer.stop()
        observer.join()
        print("\nStopped.")
