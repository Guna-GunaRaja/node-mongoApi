
s1 = "sils"
s2 = "fails"
def reverse(s1, s2):
    r1 =  s1[::-1]
    r2 =  s2[::-1]
    for j, i in zip(r1, r2):
        if i == j:
            return True
        else:
            return False
        
print(reverse(s1, s2))
