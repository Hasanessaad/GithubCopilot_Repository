from typing import Iterable

def format_line(a: int, b: int) -> str:
    """Retorna a string formatada 'a x b = resultado'."""
    return f"{a} x {b} = {a * b}"

def print_table(n: int, upto: int = 10) -> None:
    """Imprime a tabuada de `n` de 1 até `upto`."""
    if not isinstance(n, int) or not isinstance(upto, int):
        raise TypeError("n e upto devem ser inteiros")
    if upto < 1:
        raise ValueError("upto deve ser >= 1")
    print(f"Tabuada de {n}:")
    for i in range(1, upto + 1):
        print(format_line(n, i))
    print()  # linha em branco entre tabuadas

def print_tables(range_from: int = 1, range_to: int = 10, upto: int = 10) -> None:
    """Imprime várias tabuadas de range_from até range_to (inclusive)."""
    if range_from > range_to:
        range_from, range_to = range_to, range_from
    for n in range(range_from, range_to + 1):
        print_table(n, upto=upto)

if __name__ == "__main__":
    # Imprime as tabuadas de 1 a 10, cada uma até 10.
    print_tables(1, 10, 10)