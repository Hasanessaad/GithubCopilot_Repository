from typing import List, Tuple, Optional

def _validate_numbers(lst: List[object]) -> List[float]:
    """Valida e normaliza elementos numéricos (int/float, exclui bool)."""
    if not isinstance(lst, list):
        raise TypeError("espera uma lista")
    nums: List[float] = []
    for x in lst:
        if isinstance(x, bool) or not isinstance(x, (int, float)):
            raise TypeError("a lista deve conter apenas números (int ou float)")
        nums.append(float(x))
    return nums

def unique_sorted(nums: List[float]) -> List[float]:
    """Remove duplicatas e retorna os valores ordenados."""
    # usar set para remover duplicatas, depois ordenar
    return sorted(set(nums))

def average(nums: List[float]) -> Optional[float]:
    """Calcula a média; retorna None se a lista estiver vazia."""
    if not nums:
        return None
    return sum(nums) / len(nums)

def process_numbers(lst: List[object]) -> Tuple[List[float], Optional[float]]:
    """
    Remove duplicatas, ordena e calcula a média.
    Retorna (lista_ordenada_sem_duplicatas, media).
    """
    nums = _validate_numbers(lst)
    uniq_sorted = unique_sorted(nums)
    avg = average(uniq_sorted)
    return uniq_sorted, avg

if __name__ == "__main__":
    exemplos = [
        [3, 1, 2, 3, 0, -1, 5, 5],
        [],
        [4.0, 4, 4.0],
    ]
    for e in exemplos:
        sorted_unique, mean = process_numbers(e)
        print("Entrada:", e)
        print("Ordenado sem duplicatas:", sorted_unique)
        print("Média:", mean)
        print("---")