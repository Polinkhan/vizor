import re

def highlight_search_term(text: str, term: str) -> str:
    if not term:
        return text
    # Create a case-insensitive regex for the term
    regex = re.compile(f"({re.escape(term)})", re.IGNORECASE)
    # Replace each match with <mark> tags around it
    return regex.sub(r"<mark>\1</mark>", text)