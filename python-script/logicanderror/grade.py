def average_grades(grades: dict):
    """Calcula a média das notas a partir de um dicionário {nome: nota}.
    Retorna None se o dicionário estiver vazio.
    Levanta TypeError se grades não for dict ou contiver valores não numéricos.
    """
    if not isinstance(grades, dict):
        raise TypeError("espera um dicionário {nome: nota}")
    if len(grades) == 0:
        return None
    total = 0.0
    count = 0
    for name, score in grades.items():
        if not isinstance(score, (int, float)):
            raise TypeError("as notas devem ser números (int ou float)")
        total += score
        count += 1
    return total / count

if __name__ == "__main__":
    # Exemplos de uso
    exemplos = {
        "turma1": {"Alice": 8.5, "Bruno": 7, "Carlos": 9.0},
        "turma_vazia": {},
        "turma_com_string": {"Ana": 10, "Bia": "N/A"},
    }

    print("Exemplo 1:", average_grades(exemplos["turma1"]))           # 8.166...
    print("Exemplo 2 (vazio):", average_grades(exemplos["turma_vazia"]))  # None

    try:
        print("Exemplo 3 (inválido):", average_grades(exemplos["turma_com_string"]))
    except TypeError as e:
        print("Erro:", e)