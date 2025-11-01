def second_highest(lst):
    """Retorna o segundo maior valor distinto em lst.
    Se não houver pelo menos dois valores distintos, retorna None.
    Aceita int/float; levanta TypeError se lst não for lista ou contiver não-números.
    """
    if not isinstance(lst, list):
        raise TypeError("espera uma lista")
    max1 = max2 = None
    for x in lst:
        if not isinstance(x, (int, float)):
            raise TypeError("lista deve conter apenas números")
        if max1 is None or x > max1:
            if max1 is None:
                max1 = x
            else:
                if x != max1:
                    max2 = max1
                max1 = x
        elif x != max1 and (max2 is None or x > max2):
            max2 = x
    return max2

if __name__ == "__main__":
    # Exemplos rápidos
    exemplos = [
        [3, 1, 2, 3, 0, -1, 5, 5],
        [5, 5, 5],
        [7],
        []
    ]
    for e in exemplos:
        print("Lista:", e, "-> segundo maior:", second_highest(e))