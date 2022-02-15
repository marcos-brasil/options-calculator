Attribute VB_Name = "American"
Option Explicit

' Programmer Espen Gaarder Haug
' Copyright Espen Gaarder Haug  2006


'// The Bjerksund and Stensland (2002) American approximation
Public Function BSAmericanApprox2002(CallPutFlag As String, S As Double, X As Double, T As Double, r As Double, b As Double, v As Double) As Double
    
    If CallPutFlag = "c" Then
        BSAmericanApprox2002 = BSAmericanCallApprox2002(S, X, T, r, b, v)
    ElseIf CallPutFlag = "p" Then  '// Use the Bjerksund and Stensland put-call transformation
        BSAmericanApprox2002 = BSAmericanCallApprox2002(X, S, T, r - b, -b, v)
    End If
    
End Function

Public Function BSAmericanCallApprox2002(S As Double, X As Double, T As Double, r As Double, b As Double, v As Double) As Double
    
    Dim BInfinity As Double, B0 As Double
    Dim ht1 As Double, ht2 As Double, I1 As Double, I2 As Double
    Dim alfa1 As Double, alfa2 As Double, Beta As Double, t1 As Double
    
    t1 = 1 / 2 * (Sqr(5) - 1) * T
    
    If b >= r Then  '// Never optimal to exersice before maturity
            BSAmericanCallApprox2002 = GBlackScholes("c", S, X, T, r, b, v)
    Else
        
        Beta = (1 / 2 - b / v ^ 2) + Sqr((b / v ^ 2 - 1 / 2) ^ 2 + 2 * r / v ^ 2)
        BInfinity = Beta / (Beta - 1) * X
        B0 = Max(X, r / (r - b) * X)
        
        ht1 = -(b * t1 + 2 * v * Sqr(t1)) * X ^ 2 / ((BInfinity - B0) * B0)
        ht2 = -(b * T + 2 * v * Sqr(T)) * X ^ 2 / ((BInfinity - B0) * B0)
        I1 = B0 + (BInfinity - B0) * (1 - Exp(ht1))
        I2 = B0 + (BInfinity - B0) * (1 - Exp(ht2))
        alfa1 = (I1 - X) * I1 ^ (-Beta)
        alfa2 = (I2 - X) * I2 ^ (-Beta)
    
        If S >= I2 Then
            BSAmericanCallApprox2002 = S - X
        Else
            BSAmericanCallApprox2002 = alfa2 * S ^ Beta - alfa2 * phi(S, t1, Beta, I2, I2, r, b, v) _
                + phi(S, t1, 1, I2, I2, r, b, v) - phi(S, t1, 1, I1, I2, r, b, v) _
                - X * phi(S, t1, 0, I2, I2, r, b, v) + X * phi(S, t1, 0, I1, I2, r, b, v) _
                + alfa1 * phi(S, t1, Beta, I1, I2, r, b, v) - alfa1 * ksi(S, T, Beta, I1, I2, I1, t1, r, b, v) _
                + ksi(S, T, 1, I1, I2, I1, t1, r, b, v) - ksi(S, T, 1, X, I2, I1, t1, r, b, v) _
                - X * ksi(S, T, 0, I1, I2, I1, t1, r, b, v) + X * ksi(S, T, 0, X, I2, I1, t1, r, b, v)
           
        End If
    End If
End Function

Private Function phi(S As Double, T As Double, gamma As Double, H As Double, i As Double, _
        r As Double, b As Double, v As Double) As Double

    Dim lambda As Double, kappa As Double
    Dim d As Double
    
    lambda = (-r + gamma * b + 0.5 * gamma * (gamma - 1) * v ^ 2) * T
    d = -(Log(S / H) + (b + (gamma - 0.5) * v ^ 2) * T) / (v * Sqr(T))
    kappa = 2 * b / (v ^ 2) + (2 * gamma - 1)
    phi = Exp(lambda) * S ^ gamma * (CND(d) - (i / S) ^ kappa * CND(d - 2 * Log(i / S) / (v * Sqr(T))))

End Function


Public Function ksi(S As Double, T2 As Double, gamma As Double, H As Double, I2 As Double, I1 As Double, t1 As Double, r As Double, b As Double, v As Double) As Double

    Dim e1 As Double, e2 As Double, e3 As Double, e4 As Double
    Dim f1 As Double, f2 As Double, f3 As Double, f4 As Double
    Dim rho As Double, kappa As Double, lambda As Double
    
    e1 = (Log(S / I1) + (b + (gamma - 0.5) * v ^ 2) * t1) / (v * Sqr(t1))
    e2 = (Log(I2 ^ 2 / (S * I1)) + (b + (gamma - 0.5) * v ^ 2) * t1) / (v * Sqr(t1))
    e3 = (Log(S / I1) - (b + (gamma - 0.5) * v ^ 2) * t1) / (v * Sqr(t1))
    e4 = (Log(I2 ^ 2 / (S * I1)) - (b + (gamma - 0.5) * v ^ 2) * t1) / (v * Sqr(t1))
    
    f1 = (Log(S / H) + (b + (gamma - 0.5) * v ^ 2) * T2) / (v * Sqr(T2))
    f2 = (Log(I2 ^ 2 / (S * H)) + (b + (gamma - 0.5) * v ^ 2) * T2) / (v * Sqr(T2))
    f3 = (Log(I1 ^ 2 / (S * H)) + (b + (gamma - 0.5) * v ^ 2) * T2) / (v * Sqr(T2))
    f4 = (Log((S * I1 ^ 2) / (H * I2 ^ 2)) + (b + (gamma - 0.5) * v ^ 2) * T2) / (v * Sqr(T2))
    
    rho = Sqr(t1 / T2)
    lambda = -r + gamma * b + 0.5 * gamma * (gamma - 1) * v ^ 2
    kappa = 2 * b / (v ^ 2) + (2 * gamma - 1)
    
    ksi = Exp(lambda * T2) * S ^ gamma * (CBND(-e1, -f1, rho) - (I2 / S) ^ kappa * CBND(-e2, -f2, rho) _
            - (I1 / S) ^ kappa * CBND(-e3, -f3, -rho) + (I1 / I2) ^ kappa * CBND(-e4, -f4, -rho))


End Function

