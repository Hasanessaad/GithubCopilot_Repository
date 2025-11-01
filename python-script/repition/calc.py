from typing import Iterable, Union
import operator
from functools import reduce
import sys

Number = Union[int, float]

def _normalize_operands(operands):
    # se passou uma única coleção (lista/tupla), use seus elementos
    if len(operands) == 1 and isinstance(operands[0], (list, tuple)):
        operands = tuple(operands[0])
    if not operands:
        raise ValueError("é necessário pelo menos um operando")
    # validar tipos
    nums = []
    for x in operands:
        if not isinstance(x, (int, float)) or isinstance(x, bool):
            raise TypeError("operandos devem ser números (int/float), sem bool")
        nums.append(float(x))
    return nums

def calculate(op: str, *operands: Union[Number, Iterable[Number]]) -> float:
    """Aplica a operação `op` aos operandos (pode passar vários argumentos ou uma lista).
    op: 'add'|'+'|'sum', 'sub'|'-', 'mul'|'*'|'prod', 'div'|'/'.
    Retorna float. Lança TypeError/ValueError/ZeroDivisionError conforme apropriado.
    """
    op_name = (op or "").strip().lower()
    nums = _normalize_operands(operands)

    if op_name in {"add", "+", "sum"}:
        return float(sum(nums))
    if op_name in {"mul", "*", "prod", "times"}:
        return float(reduce(operator.mul, nums))
    if op_name in {"sub", "-"}:
        # subtrai sequencialmente: a - b - c - ...
        return float(reduce(lambda a, b: a - b, nums))
    if op_name in {"div", "/"}:
        def safe_div(a, b):
            if b == 0:
                raise ZeroDivisionError("divisão por zero")
            return a / b
        return float(reduce(safe_div, nums))
    raise ValueError(f"operação desconhecida: {op}")

if __name__ == "__main__":
    # Uso via linha de comando:
    # python calc.py add 1 2 3
    # python calc.py div 10 2
    if len(sys.argv) <= 2:
        print("Exemplos:")
        print("  python calc.py add 1 2 3       # 6.0")
        print("  python calc.py sub 10 1 2      # 7.0 (10-1-2)")
        print("  python calc.py mul 2 3 4       # 24.0")
        print("  python calc.py div 20 2 2      # 5.0 (20/2/2)")
        sys.exit(0)

    operation = sys.argv[1]
    try:
        operands = [float(x) for x in sys.argv[2:]]
    except ValueError:
        print("Erro: todos os operandos devem ser números")
        sys.exit(1)

    try:
        result = calculate(operation, operands)
        print(result)
    except Exception as e:
        print("Erro:", e)
        sys.exit(1)