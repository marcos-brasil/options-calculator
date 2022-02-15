Attribute VB_Name = "WorkLab"
Option Explicit

'// Rubinstein Gram-Charlier and Edgworth binomial
Public Function RubinsteinSKB(Expansion As String, OutputFLag As String, CallPutFlag As String, S As Double, _
                                            X As Double, T As Double, r As Double, b As Double, v As Double, Skew As Double, Kurt As Double, n As Double) As Variant
        
        Dim u As Double, d As Double, p() As Double
        Dim Sum As Double, PSum As Double, dt As Double, A As Double
        Dim i As Integer, z As Integer
        Dim xi As Double
        
       Dim St() As Double
        
        z = 1
        If CallPutFlag = "p" Then
            z = -1
        End If
        
        ReDim p(0 To n)
       ReDim St(0 To n)
        
        dt = (T / n)
        u = Exp((b - v ^ 2 / 2) * dt + v * Sqr(dt))
        d = Exp((b - v ^ 2 / 2) * dt - v * Sqr(dt))
        
    Sum = 0
    PSum = 0
        For i = 0 To n Step 1
            xi = (2 * i - n) / Sqr(n)
            If Expansion = "e" Then 'Edgworth-Expansion
                p(i) = Application.Combin(n, i) * 0.5 ^ n * (1 + 1 / 6 * Skew * (xi ^ 3 - 3 * xi) + 1 / 24 * (Kurt - 3) * (xi ^ 4 - 6 * xi ^ 2 + 3) + Skew ^ 2 * (xi ^ 6 - 15 * xi ^ 4 + 45 * xi ^ 2 - 15) / 72)
            Else 'Gram -Charlier
                p(i) = Application.Combin(n, i) * 0.5 ^ n * (1 + 1 / 6 * Skew * (xi ^ 3 - 3 * xi) + 1 / 24 * (Kurt - 3) * (xi ^ 4 - 6 * xi ^ 2 + 3))
            End If
            PSum = PSum + p(i)
            St(i) = S * u ^ i * d ^ (n - i)
        Next
        For i = 0 To n Step 1
            p(i) = p(i) / PSum
            Sum = Sum + p(i) * Max(z * (S * u ^ i * d ^ (n - i) - X), 0)
        Next
   If OutputFLag = "p" Then
        RubinsteinSKB = Exp(-r * T) * Sum
   ElseIf OutputFLag = "prob" Then
        RubinsteinSKB = Application.Transpose(p())
    ElseIf OutputFLag = "St" Then
        RubinsteinSKB = Application.Transpose(St())
    End If
    
End Function


