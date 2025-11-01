def _merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i]); i += 1
        else:
            result.append(right[j]); j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result

def merge_sort(lst):
    """Ordena uma lista de inteiros usando merge sort (estável).
    Aceita listas vazias e mantém duplicatas.
    Não usa funções internas de ordenação.
    """
    if not isinstance(lst, list):
        raise TypeError("merge_sort espera uma lista")
    if len(lst) <= 1:
        return lst[:]  # retorna cópia para não modificar a original
    mid = len(lst) // 2
    left = merge_sort(lst[:mid])
    right = merge_sort(lst[mid:])
    return _merge(left, right)

def sort_integers(lst):
    """Valida e ordena uma lista de inteiros."""
    if not isinstance(lst, list):
        raise TypeError("sort_integers espera uma lista")
    if not all(isinstance(x, int) for x in lst):
        raise TypeError("A lista deve conter apenas inteiros")
    return merge_sort(lst)

if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1:
        try:
            nums = [int(x) for x in sys.argv[1:]]
        except ValueError:
            print("Erro: todos os argumentos devem ser inteiros")
            sys.exit(1)
    else:
        s = input("Digite inteiros separados por espaço (ou ENTER para exemplo): ").strip()
        if s == "":
            nums = [3, 1, 2, 3, 0, -1, 5, 5]  # exemplo
        else:
            try:
                nums = [int(x) for x in s.split()]
            except ValueError:
                print("Entrada inválida: use apenas inteiros")
                sys.exit(1)

    print("Entrada:", nums)
    print("Ordenado:", sort_integers(nums))