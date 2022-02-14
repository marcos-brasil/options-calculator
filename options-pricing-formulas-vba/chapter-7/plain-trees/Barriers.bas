Attribute VB_Name = "Barriers"
Option Explicit

' Programmer Espen Gaarder Haug
' Copyright 2006 Espen Gaarder Haug


Public Function BinomialBridgeBarrier(CallPutFlag As String, S As Double, X As Double, H As Double, Rebate As Double, T As Double, _
                r As Double, b As Double, v As Double, n As Integer) As Double
                
    Dim OptionValue As Double
    Dim u As Double, d As Double, p As Double
    Dim dt As Double
    Dim i As Integer, z As Integer
    
    Dim BarrierHitProb As Double, RebateValue As Double
    Dim St As Double, PathProb As Double

    
    If CallPutFlag = "c" Then
        z = 1
        ElseIf CallPutFlag = "p" Then
        z = -1
    End If
    
    dt = T / n
  
    u = Exp((b - v ^ 2 / 2) * dt + v * Sqr(dt))
    d = Exp((b - v ^ 2 / 2) * dt - v * Sqr(dt))
    p = 0.5
    
    
    OptionValue = 0
    PathProb = 0

    For i = 0 To n
            St = S * u ^ i * d ^ (n - i)
          If S > H Then
          '//Probability of hitting  barrier below
                If St <= H Then
                      BarrierHitProb = 1
                Else
                        BarrierHitProb = Exp(-2 / (v ^ 2 * T) * Abs(Log(H / S) * Log(H / St)))
                     
                End If
            ElseIf S < H Then
            '// Probability of hitting the barrier above
                If St >= H Then
                    BarrierHitProb = 1
                Else
                    BarrierHitProb = Exp(-2 / (v ^ 2 * T) * Abs(Log(S / H) * Log(St / H)))
                   
                End If
            End If
    
            PathProb = Application.Combin(n, i) * p ^ i * (1 - p) ^ (n - i)
            OptionValue = OptionValue + (1 - BarrierHitProb) * PathProb * Max(0, z * (St - X))
           
            RebateValue = RebateValue + BarrierHitProb * Rebate * PathProb
    Next
    
            BinomialBridgeBarrier = (OptionValue + RebateValue) * Exp(-r * T)

End Function



'// European and American barrier options in binomial trees
Public Function BarrierBinomial(AmeEurFlag As String, TypeFlag As String, S As Double, X As Double, H As Double, T As Double, _
                r As Double, b As Double, v As Double, n As Integer) As Double

    Dim AssetPrice As Double
    Dim OptionValue() As Double
    Dim dt As Double, Df As Double
    Dim u As Double, d As Double, p As Double
    Dim i As Integer, j As Integer
    Dim phi As Integer, z As Integer
    
     For i = 1 To 100
        If n < Int((i ^ 2 * v ^ 2 * T) / (Log(S / H)) ^ 2) Then
            n = Int((i ^ 2 * v ^ 2 * T) / (Log(S / H)) ^ 2)
            Exit For
        End If
    Next
    
    ReDim OptionValue(n + 1)
    
    If TypeFlag = "cuo" Or TypeFlag = "cdo" Then
        z = 1
        ElseIf TypeFlag = "puo" Or TypeFlag = "pdo" Then
        z = -1
    End If
    If TypeFlag = "cuo" Or TypeFlag = "puo" Then
        phi = 1
        ElseIf TypeFlag = "cdo" Or TypeFlag = "pdo" Then
        phi = -1
    End If
    
    dt = T / n
    u = Exp(v * Sqr(dt))
    d = 1 / u
    p = (Exp(b * dt) - d) / (u - d)
    Df = Exp(-r * dt)
    
    For i = 0 To n
         OptionValue(i) = Max(0, z * (S * u ^ i * d ^ (n - i) - X))
    Next
    
    For j = n - 1 To 0 Step -1:
        For i = 0 To j
            AssetPrice = S * u ^ i * d ^ Abs(i - j)
            
            If phi = 1 Then
                If AmeEurFlag = "e" And AssetPrice < H Then
                    OptionValue(i) = (p * OptionValue(i + 1) + (1 - p) * OptionValue(i)) * Df
                ElseIf AmeEurFlag = "a" And AssetPrice < H Then
                    OptionValue(i) = Max((z * (AssetPrice - X)), _
                    (p * OptionValue(i + 1) + (1 - p) * OptionValue(i)) * Df)
                ElseIf AssetPrice >= H Then
                    OptionValue(i) = 0
                End If
            Else
                If AmeEurFlag = "e" And AssetPrice > H Then
                    OptionValue(i) = (p * OptionValue(i + 1) + (1 - p) * OptionValue(i)) * Df
                ElseIf AmeEurFlag = "a" And AssetPrice > H Then
                    OptionValue(i) = Max((z * (AssetPrice - X)), _
                    (p * OptionValue(i + 1) + (1 - p) * OptionValue(i)) * Df)
                ElseIf AssetPrice <= H Then
                    OptionValue(i) = 0
                End If
            End If
        Next
    Next
    BarrierBinomial = OptionValue(0)
End Function


Public Function AmericanKnockInBarriers(TypeFlag As String, S As Double, X As Double, _
        H As Double, T As Double, r As Double, b As Double, v As Double, n As Integer)
            
            Dim CallPutFlag As String
            
            CallPutFlag = Left(TypeFlag, 1)
            
           If H <= X Then
                AmericanKnockInBarriers = (S / H) ^ (1 - 2 * b / v ^ 2) _
                * TrinomialTree("p", "a", CallPutFlag, H ^ 2 / S, X, T, r, b, v, n)
           ElseIf H <= Max(X, r / (r - b) * X) Then
                AmericanKnockInBarriers = (S / H) ^ (1 - 2 * b / v ^ 2) _
                * (TrinomialTree("p", "a", CallPutFlag, H ^ 2 / S, X, T, r, b, v, n) _
                    - GBlackScholes(CallPutFlag, H ^ 2 / S, X, T, r, b, v)) _
                    + StandardBarrier(TypeFlag, S, X, H, 0, T, r, b, v)
                    
           End If
            
End Function

Public Function GBlackScholes(CallPutFlag As String, S As Double, X _
                As Double, T As Double, r As Double, b As Double, v As Double) As Double

    Dim d1 As Double, d2 As Double
    d1 = (Log(S / X) + (b + v ^ 2 / 2) * T) / (v * Sqr(T))
    d2 = d1 - v * Sqr(T)

    If CallPutFlag = "c" Then
        GBlackScholes = S * Exp((b - r) * T) * CND(d1) - X * Exp(-r * T) * CND(d2)
    ElseIf CallPutFlag = "p" Then
        GBlackScholes = X * Exp(-r * T) * CND(-d2) - S * Exp((b - r) * T) * CND(-d1)
    End If
End Function

Public Function StandardBarrier(TypeFlag As String, S As Double, X As Double, H As Double, K As Double, T As Double, _
            r As Double, b As Double, v As Double)

    'TypeFlag:      The "TypeFlag" gives you 8 different standard barrier options:
    '               1) "cdi"=Down-and-in call,    2) "cui"=Up-and-in call
    '               3) "pdi"=Down-and-in put,     4) "pui"=Up-and-in put
    '               5) "cdo"=Down-and-out call,   6) "cuo"=Up-out-in call
    '               7) "pdo"=Down-and-out put,    8) "puo"=Up-out-in put
    
    Dim mu As Double
    Dim lambda As Double
    Dim X1 As Double, X2 As Double
    Dim y1 As Double, y2 As Double
    Dim z As Double
    
    Dim eta As Integer    'Binary variable that can take the value of 1 or -1
    Dim phi As Integer    'Binary variable that can take the value of 1 or -1
    
    Dim f1 As Double    'Equal to formula "A" in the book
    Dim f2 As Double    'Equal to formula "B" in the book
    Dim f3 As Double    'Equal to formula "C" in the book
    Dim f4 As Double    'Equal to formula "D" in the book
    Dim f5 As Double    'Equal to formula "E" in the book
    Dim f6 As Double    'Equal to formula "F" in the book

    mu = (b - v ^ 2 / 2) / v ^ 2
    lambda = Sqr(mu ^ 2 + 2 * r / v ^ 2)
    X1 = Log(S / X) / (v * Sqr(T)) + (1 + mu) * v * Sqr(T)
    X2 = Log(S / H) / (v * Sqr(T)) + (1 + mu) * v * Sqr(T)
    y1 = Log(H ^ 2 / (S * X)) / (v * Sqr(T)) + (1 + mu) * v * Sqr(T)
    y2 = Log(H / S) / (v * Sqr(T)) + (1 + mu) * v * Sqr(T)
    z = Log(H / S) / (v * Sqr(T)) + lambda * v * Sqr(T)
    
    If TypeFlag = "cdi" Or TypeFlag = "cdo" Then
        eta = 1
        phi = 1
    ElseIf TypeFlag = "cui" Or TypeFlag = "cuo" Then
        eta = -1
        phi = 1
    ElseIf TypeFlag = "pdi" Or TypeFlag = "pdo" Then
        eta = 1
        phi = -1
    ElseIf TypeFlag = "pui" Or TypeFlag = "puo" Then
        eta = -1
        phi = -1
    End If
    
    f1 = phi * S * Exp((b - r) * T) * CND(phi * X1) - phi * X * Exp(-r * T) * CND(phi * X1 - phi * v * Sqr(T))
    f2 = phi * S * Exp((b - r) * T) * CND(phi * X2) - phi * X * Exp(-r * T) * CND(phi * X2 - phi * v * Sqr(T))
    f3 = phi * S * Exp((b - r) * T) * (H / S) ^ (2 * (mu + 1)) * CND(eta * y1) - phi * X * Exp(-r * T) * (H / S) ^ (2 * mu) * CND(eta * y1 - eta * v * Sqr(T))
    f4 = phi * S * Exp((b - r) * T) * (H / S) ^ (2 * (mu + 1)) * CND(eta * y2) - phi * X * Exp(-r * T) * (H / S) ^ (2 * mu) * CND(eta * y2 - eta * v * Sqr(T))
    f5 = K * Exp(-r * T) * (CND(eta * X2 - eta * v * Sqr(T)) - (H / S) ^ (2 * mu) * CND(eta * y2 - eta * v * Sqr(T)))
    f6 = K * ((H / S) ^ (mu + lambda) * CND(eta * z) + (H / S) ^ (mu - lambda) * CND(eta * z - 2 * eta * lambda * v * Sqr(T)))
    
    
    If X > H Then
        Select Case TypeFlag
            Case Is = "cdi"      '1a) cdi
                StandardBarrier = f3 + f5
            Case Is = "cui"   '2a) cui
                StandardBarrier = f1 + f5
            Case Is = "pdi"    '3a) pdi
                StandardBarrier = f2 - f3 + f4 + f5
            Case Is = "pui" '4a) pui
                StandardBarrier = f1 - f2 + f4 + f5
            Case Is = "cdo"    '5a) cdo
                StandardBarrier = f1 - f3 + f6
            Case Is = "cuo"   '6a) cuo
                StandardBarrier = f6
            Case Is = "pdo"   '7a) pdo
                StandardBarrier = f1 - f2 + f3 - f4 + f6
            Case Is = "puo" '8a) puo
                StandardBarrier = f2 - f4 + f6
            End Select
    ElseIf X < H Then
        Select Case TypeFlag
            Case Is = "cdi" '1b) cdi
                StandardBarrier = f1 - f2 + f4 + f5
            Case Is = "cui"  '2b) cui
                StandardBarrier = f2 - f3 + f4 + f5
            Case Is = "pdi" '3b) pdi
                StandardBarrier = f1 + f5
            Case Is = "pui"   '4b) pui
                StandardBarrier = f3 + f5
            Case Is = "cdo" '5b) cdo
                StandardBarrier = f2 + f6 - f4
            Case Is = "cuo" '6b) cuo
                StandardBarrier = f1 - f2 + f3 - f4 + f6
            Case Is = "pdo"   '7b) pdo
                StandardBarrier = f6
            Case Is = "puo"  '8b) puo
                StandardBarrier = f1 - f3 + f6
        End Select
    End If
End Function

 '// Discrete barrier monitoring adjustment
Public Function DiscreteAdjustedBarrier(S As Double, H As Double, v As Double, dt As Double) As Double

    If H > S Then
        DiscreteAdjustedBarrier = H * Exp(0.5826 * v * Sqr(dt))
    ElseIf H < S Then
        DiscreteAdjustedBarrier = H * Exp(-0.5826 * v * Sqr(dt))
    End If
End Function



'// Trinomial tree Derman Egner typen
Public Function TrinomialTreeBarrierDerman(AmeEurFlag As String, CallPutFlag As String, S As Double, X As Double, H As Double, T As Double, _
                r As Double, b As Double, v As Double, n As Integer) As Double
                
    Dim OptionValue() As Double
    Dim dt As Double, u As Double, d As Double
    Dim pu As Double, pd As Double, pm As Double
    Dim i As Integer, j As Integer, z As Integer
    Dim Df As Double
    Dim Si1 As Double, Si2 As Double
    
    
    ReDim OptionValue(0 To n * 2 + 1)
   
    
    If CallPutFlag = "c" Then
        z = 1
        ElseIf CallPutFlag = "p" Then
        z = -1
    End If
    
    dt = T / n
    u = Exp(v * Sqr(2 * dt))
    d = Exp(-v * Sqr(2 * dt))
    pu = ((Exp(b * dt / 2) - Exp(-v * Sqr(dt / 2))) / (Exp(v * Sqr(dt / 2)) - Exp(-v * Sqr(dt / 2)))) ^ 2
   
    pd = ((Exp(v * Sqr(dt / 2)) - Exp(b * dt / 2)) / (Exp(v * Sqr(dt / 2)) - Exp(-v * Sqr(dt / 2)))) ^ 2
    pm = 1 - pu - pd
    Df = Exp(-r * dt)
    
    For i = 0 To 2 * n
        Si1 = S * u ^ Max(i - n, 0) * d ^ Max(n * 2 - n - i, 0)
        Si2 = Si1 * d
        
        OptionValue(i) = Max(0, z * (Si1 - X))
       If Si1 <= H Then
                    OptionValue(i) = 0
        ElseIf Si1 > H And Si2 <= H And i - 1 > 0 Then
                OptionValue(i) = (Si1 - H) / (Si1 - Si2) * (OptionValue(i) - 0)
        End If
        
    Next
    
    For j = n - 1 To 0 Step -1
        For i = 0 To j * 2
        
                Si1 = S * u ^ Max(i - j, 0) * d ^ Max(j * 2 - j - i, 0)
                Si2 = Si1 * d
                
                OptionValue(i) = (pu * OptionValue(i + 2) + pm * OptionValue(i + 1) + pd * OptionValue(i)) * Df
                
                If AmeEurFlag = "a" Then
                        OptionValue(i) = Max((z * (Si1 - X)), OptionValue(i))
                End If
                        
           
                If Si1 <= H Then
                        OptionValue(i) = 0
                ElseIf Si1 > H And Si2 <= H And i - 1 > 0 Then  ' //Derman  barrier correction
                       OptionValue(i) = (Si1 - H) / (Si1 - Si2) * (OptionValue(i) - 0)
                End If
        Next
    Next
    TrinomialTreeBarrierDerman = OptionValue(0)
End Function
