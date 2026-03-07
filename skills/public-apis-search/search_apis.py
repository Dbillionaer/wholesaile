#!/usr/bin/env python3
"""Search public APIs database - 1,558+ free APIs across 52 categories"""

import json
import sys
from pathlib import Path

DB_PATH = Path(__file__).parent.parent / "public-apis-reference" / "db" / "resources.json"
CAT_PATH = Path(__file__).parent.parent / "public-apis-reference" / "db" / "categories.json"

def load_apis():
    with open(DB_PATH) as f:
        return json.load(f)['entries']

def load_categories():
    with open(CAT_PATH) as f:
        return json.load(f)['entries']

def search(keyword):
    """Search APIs by keyword in name or description"""
    apis = load_apis()
    keyword = keyword.lower()
    results = [a for a in apis if 
               keyword in a.get('API', '').lower() or 
               keyword in a.get('Description', '').lower() or
               keyword in a.get('Category', '').lower()]
    
    if not results:
        print(f"No APIs found for '{keyword}'")
        return
    
    print(f"\n🔍 Found {len(results)} APIs matching '{keyword}':\n")
    for api in results[:20]:  # Limit to 20 results
        auth = api.get('Auth', 'None') or 'None'
        https = '✅' if api.get('HTTPS') else '❌'
        print(f"**{api['API']}**")
        print(f"  {api['Description']}")
        print(f"  Category: {api['Category']} | Auth: {auth} | HTTPS: {https}")
        print(f"  Link: {api['Link']}")
        print()
    
    if len(results) > 20:
        print(f"... and {len(results) - 20} more results")

def list_categories():
    """List all categories"""
    cats = load_categories()
    apis = load_apis()
    
    # Count APIs per category
    counts = {}
    for api in apis:
        cat = api.get('Category', 'Unknown')
        counts[cat] = counts.get(cat, 0) + 1
    
    print(f"\n📚 {len(cats)} Categories with {len(apis)} Total APIs:\n")
    for cat in sorted(counts.keys()):
        print(f"  {cat}: {counts[cat]} APIs")

def by_category(category):
    """List APIs in a specific category"""
    apis = load_apis()
    category_lower = category.lower()
    results = [a for a in apis if a.get('Category', '').lower() == category_lower]
    
    if not results:
        # Try partial match
        results = [a for a in apis if category_lower in a.get('Category', '').lower()]
    
    if not results:
        print(f"No APIs found in category '{category}'")
        return
    
    print(f"\n📂 {len(results)} APIs in '{category}' category:\n")
    for api in results:
        auth = api.get('Auth', 'None') or 'None'
        https = '✅' if api.get('HTTPS') else '❌'
        print(f"**{api['API']}**")
        print(f"  {api['Description']}")
        print(f"  Auth: {auth} | HTTPS: {https}")
        print(f"  Link: {api['Link']}")
        print()

def no_auth():
    """List APIs that require no authentication"""
    apis = load_apis()
    results = [a for a in apis if not a.get('Auth')]
    
    print(f"\n🆓 {len(results)} APIs with NO AUTHENTICATION required:\n")
    for api in results[:30]:  # Limit to 30
        print(f"**{api['API']}** ({api['Category']})")
        print(f"  {api['Description']}")
        print(f"  Link: {api['Link']}")
        print()
    
    if len(results) > 30:
        print(f"... and {len(results) - 30} more free APIs")

def main():
    if len(sys.argv) < 2:
        print("Usage:")
        print("  search_apis.py search <keyword>  - Search by keyword")
        print("  search_apis.py categories        - List all categories")
        print("  search_apis.py category <name>   - APIs in category")
        print("  search_apis.py noauth            - APIs without auth")
        return
    
    cmd = sys.argv[1].lower()
    
    if cmd == 'search' and len(sys.argv) > 2:
        search(' '.join(sys.argv[2:]))
    elif cmd == 'categories':
        list_categories()
    elif cmd == 'category' and len(sys.argv) > 2:
        by_category(' '.join(sys.argv[2:]))
    elif cmd == 'noauth':
        no_auth()
    else:
        print(f"Unknown command: {cmd}")

if __name__ == '__main__':
    main()
