def is_palindrome(s):
    """Retorna True se s é palíndromo ignorando espaços, pontuação e diferenças de maiúsculas/minúsculas.
    Levanta TypeError se s não for str.
    """
    if not isinstance(s, str):
        raise TypeError("espera uma string")
    filtered = ''.join(ch.lower() for ch in s if ch.isalnum())
    return filtered == filtered[::-1]

if __name__ == "__main__":
    exemplos = [
        "A man, a plan, a canal: Panama",
        "Socorram-me, subi no ônibus em Marrocos",
        "Não é um palíndromo",
        "",
        "ÁéÍíéÁ"
    ]
    for e in exemplos:
        print(f"'{e}' ->", is_palindrome(e))