from pathlib import Path
import json
import csv
from typing import List, Dict, Any, Union, Optional

PathLike = Union[str, Path]

def _ensure_file_path(path: PathLike) -> Path:
    p = Path(path)
    if p.exists() and p.is_dir():
        raise IsADirectoryError(f"{p} é um diretório")
    return p

# TXT
def read_text(path: PathLike, encoding: str = "utf-8") -> str:
    p = _ensure_file_path(path)
    with p.open("r", encoding=encoding) as f:
        return f.read()

def write_text(path: PathLike, content: str, encoding: str = "utf-8") -> None:
    p = _ensure_file_path(path)
    p.parent.mkdir(parents=True, exist_ok=True)
    with p.open("w", encoding=encoding) as f:
        f.write(content)

# JSON
def read_json(path: PathLike, encoding: str = "utf-8") -> Any:
    p = _ensure_file_path(path)
    with p.open("r", encoding=encoding) as f:
        return json.load(f)

def write_json(path: PathLike, obj: Any, encoding: str = "utf-8", indent: Optional[int] = 2) -> None:
    p = _ensure_file_path(path)
    p.parent.mkdir(parents=True, exist_ok=True)
    with p.open("w", encoding=encoding) as f:
        json.dump(obj, f, ensure_ascii=False, indent=indent)

# CSV (works with list[dict])
def read_csv(path: PathLike, encoding: str = "utf-8") -> List[Dict[str, str]]:
    p = _ensure_file_path(path)
    with p.open("r", encoding=encoding, newline="") as f:
        reader = csv.DictReader(f)
        return [dict(row) for row in reader]

def write_csv(path: PathLike, rows: List[Dict[str, Any]], encoding: str = "utf-8", fieldnames: Optional[List[str]] = None) -> None:
    if not rows and not fieldnames:
        raise ValueError("rows vazio requer fieldnames")
    p = _ensure_file_path(path)
    p.parent.mkdir(parents=True, exist_ok=True)
    if fieldnames is None:
        # inferir a partir da primeira linha (mantém ordem inserida no dict)
        fieldnames = list(rows[0].keys()) if rows else fieldnames
    with p.open("w", encoding=encoding, newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for r in rows:
            writer.writerow({k: ("" if v is None else v) for k, v in r.items()})

# Genéricos que escolhem formato por extensão
def read_file(path: PathLike) -> Any:
    p = Path(path)
    suffix = p.suffix.lower()
    if suffix == ".txt" or suffix == "":
        return read_text(p)
    if suffix == ".json":
        return read_json(p)
    if suffix == ".csv":
        return read_csv(p)
    raise ValueError(f"formato não suportado: {suffix}")

def write_file(path: PathLike, data: Any) -> None:
    p = Path(path)
    suffix = p.suffix.lower()
    if suffix == ".txt" or suffix == "":
        if not isinstance(data, str):
            raise TypeError("para .txt data deve ser str")
        write_text(p, data)
        return
    if suffix == ".json":
        write_json(p, data)
        return
    if suffix == ".csv":
        if not isinstance(data, list) or (data and not isinstance(data[0], dict)):
            raise TypeError("para .csv data deve ser List[Dict]")
        write_csv(p, data)
        return
    raise ValueError(f"formato não suportado: {suffix}")

if __name__ == "__main__":
    # Exemplos rápidos
    base = Path(__file__).resolve().parent / "out_examples"
    txt_path = base / "example.txt"
    json_path = base / "example.json"
    csv_path = base / "example.csv"

    sample_text = "Linha 1\nLinha 2\n"
    sample_obj = {"nome": "Alice", "idade": 30, "notas": [8.5, 9.0]}
    sample_rows = [
        {"nome": "Alice", "idade": 30},
        {"nome": "Bruno", "idade": 25},
    ]

    write_file(txt_path, sample_text)
    write_file(json_path, sample_obj)
    write_file(csv_path, sample_rows)

    print("TXT ->", read_file(txt_path))
    print("JSON ->", read_file(json_path))
    print("CSV ->", read_file(csv_path))