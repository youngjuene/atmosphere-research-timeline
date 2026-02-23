import json
import re

json_file = '/Users/tx/Desktop/timeline/atmosphere_timeline_dataset.json'
js_file = '/Users/tx/Desktop/timeline/src/data.js'

with open(js_file, 'r', encoding='utf-8') as f:
    js_content = f.read()

# Parse existing papers to preserve citations, position, note1, year
existing_papers = {}
papers_match = re.search(r'export const papers = \[\n(.*?)\n\];\n', js_content, re.DOTALL)
if papers_match:
    lines = papers_match.group(1).split('\n')
    for line in lines:
        if line.strip().startswith('{'):
            id_m = re.search(r"id:\s*'([^']+)'", line)
            if id_m:
                pid = id_m.group(1)
                citations_m = re.search(r"citations:\s*(\d+)", line)
                pos_m = re.search(r"position:\s*'([^']+)'", line)
                note1_m = re.search(r"note1:\s*'([^']+)'", line)
                year_m = re.search(r"year:\s*([\d.]+)", line)
                
                existing_papers[pid] = {
                    'citations': int(citations_m.group(1)) if citations_m else 0,
                    'position': pos_m.group(1) if pos_m else 'above',
                    'note1': note1_m.group(1) if note1_m else 'P',
                    'year': year_m.group(1) if year_m else None
                }

papers = []

def assign_note1(year):
    if year <= 1945: return 'P'
    if year <= 1989: return 'Ph'
    if year <= 2010: return 'F'
    if year <= 2019: return 'M'
    return 'C'

def assign_note2(sub_track):
    tag_map = {
        'Philosophy':            '1',
        'Spatial Theory':        '1',
        'Aesthetic':             '2',
        'Artistic Exploration':  '2',
        'Architectural Practice':'3',
        'Empirical Research':    '4',
        'Research Methodology':  '5',
        'Artificial Intelligence':'6',
        'Automated Sensing':     '6',
    }
    return tag_map.get(sub_track, '1')

def track_to_category(broad_track):
    track_map = {
        'Foundational Theory':    'foundational',
        'Architecture & Design':  'architecture',
        'Urban & Social Science': 'urban',
        'Computational Systems':  'computational',
    }
    return track_map.get(broad_track, 'foundational')

with open(json_file, 'r', encoding='utf-8') as f:
    records = json.load(f)

for i, row in enumerate(records):
    pid = row['work_id']
    year_int = int(row['year'])
    existing = existing_papers.get(pid, {})

    cit = existing.get('citations', 0)

    pos = existing.get('position')
    if not pos:
        pos = ['above', 'below', 'above-high', 'below-low'][i % 4]

    note1 = existing.get('note1')
    if not note1:
        note1 = assign_note1(year_int)

    note2 = assign_note2(row['sub_track'])
    cat = track_to_category(row['broad_track'])

    year_val = existing.get('year')
    if not year_val:
        year_val = str(year_int)

    st = row['short_title'].replace("'", "\\'")
    ft = row['full_title'].replace("'", "\\'")
    au = row['authors'].replace("'", "\\'")
    vn = row['venue'].replace("'", "\\'")
    rt = row['responds_to'].replace("'", "\\'")
    u = row['doi_or_url']
    vt = row['venue_type']

    paper_str = f"  {{ id: '{pid}', title: '{st}', fullTitle: '{ft}', authors: '{au}', venue: '{vn}', venueType: '{vt}', url: '{u}', citations: {cit}, respondsTo: '{rt}', category: '{cat}', year: {year_val}, position: '{pos}', note1: '{note1}', note2: '{note2}' }}"
    papers.append(paper_str)

new_papers_block = "export const papers = [\n" + ",\n".join(papers) + "\n];\n"

# Replace the array
new_js_content = re.sub(r'export const papers = \[\n.*?\n\];\n', new_papers_block, js_content, flags=re.DOTALL)

with open(js_file, 'w', encoding='utf-8') as f:
    f.write(new_js_content)

print("Updated data.js")
