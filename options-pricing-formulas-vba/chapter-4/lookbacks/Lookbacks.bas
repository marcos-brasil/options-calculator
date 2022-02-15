Attribute VB_Name = "Lookbacks"
Option Explicit


' Implementation By Espen Gaarder Haug
' Copyright 2006 Espen Gaarder Haug

'// Extreme spread options
Public Function ExtremeSpreadOption(TypeFlag As Integer, S As Double, SMin As Double, SMax As Double, t1 As Double, T As Double, r As Double, b As Double, v As Double) As Double
            
        Dim m As Double, Mo As Double
        Dim mu1 As Double, mu As Double
        Dim kappa As Integer, eta As Integer
        
        If TypeFlag = 1 Or TypeFlag = 3 Then
            eta = 1
        Else
            eta = -1
        End If
        If TypeFlag = 1 Or TypeFlag = 2 Then
            kappa = 1
        Else
            kappa = -1
        End If
            
        If kappa * eta = 1 Then
             If S > SMax Then SMax = S
            Mo = SMax
        ElseIf kappa * eta = -1 Then
            If S < SMin Then SMin = S
            Mo = SMin
        End If
        
        mu1 = b - v ^ 2 / 2
        mu = mu1 + v ^ 2
        m = Log(Mo / S)
        If kappa = 1 Then '// Extreme Spread Option
            ExtremeSpreadOption = eta * (S * Exp((b - r) * T) * (1 + v ^ 2 / (2 * b)) * CND(eta * (-m + mu * T) / (v * Sqr(T))) - Exp(-r * (T - t1)) * S * Exp((b - r) * T) * (1 + v ^ 2 / (2 * b)) * CND(eta * (-m + mu * t1) / (v * Sqr(t1))) _
            + Exp(-r * T) * Mo * CND(eta * (m - mu1 * T) / (v * Sqr(T))) - Exp(-r * T) * Mo * v ^ 2 / (2 * b) * Exp(2 * mu1 * m / v ^ 2) * CND(eta * (-m - mu1 * T) / (v * Sqr(T))) _
            - Exp(-r * T) * Mo * CND(eta * (m - mu1 * t1) / (v * Sqr(t1))) + Exp(-r * T) * Mo * v ^ 2 / (2 * b) * Exp(2 * mu1 * m / v ^ 2) * CND(eta * (-m - mu1 * t1) / (v * Sqr(t1))))
        ElseIf kappa = -1 Then  '// Reverse Extreme Spread Option
            ExtremeSpreadOption = -eta * (S * Exp((b - r) * T) * (1 + v ^ 2 / (2 * b)) * CND(eta * (m - mu * T) / (v * Sqr(T))) + Exp(-r * T) * Mo * CND(eta * (-m + mu1 * T) / (v * Sqr(T))) _
            - Exp(-r * T) * Mo * v ^ 2 / (2 * b) * Exp(2 * mu1 * m / v ^ 2) * CND(eta * (m + mu1 * T) / (v * Sqr(T))) - S * Exp((b - r) * T) * (1 + v ^ 2 / (2 * b)) * CND(eta * (-mu * (T - t1)) / (v * Sqr(T - t1))) _
            - Exp(-r * (T - t1)) * S * Exp((b - r) * T) * (1 - v ^ 2 / (2 * b)) * CND(eta * (mu1 * (T - t1)) / (v * Sqr(T - t1))))
        End If
End Function



Public Function EExtremeSpreadOption(OutPutFlag As String, TypeFlag As Integer, S As Double, SMin As Double, SMax As Double, t1 As Double, T As Double, _
                r As Double, b As Double, v As Double, Optional dS)
            
    If IsMissing(dS) Then
        dS = 0.01
    End If
    
    
    If OutPutFlag = "p" Then ' Value
        EExtremeSpreadOption = ExtremeSpreadOption(TypeFlag, S, SMin, SMax, t1, T, r, b, v)
    ElseIf OutPutFlag = "d" Then 'Delta
         EExtremeSpreadOption = (ExtremeSpreadOption(TypeFlag, S + dS, SMin, SMax, t1, T, r, b, v) - ExtremeSpreadOption(TypeFlag, S - dS, SMin, SMax, t1, T, r, b, v)) / (2 * dS)
    ElseIf OutPutFlag = "e" Then 'Elasticity
         EExtremeSpreadOption = (ExtremeSpreadOption(TypeFlag, S + dS, SMin, SMax, t1, T, r, b, v) - ExtremeSpreadOption(TypeFlag, S - dS, SMin, SMax, t1, T, r, b, v)) / (2 * dS) * S / ExtremeSpreadOption(TypeFlag, S, SMin, SMax, t1, T, r, b, v)
    ElseIf OutPutFlag = "g" Then 'Gamma
        EExtremeSpreadOption = (ExtremeSpreadOption(TypeFlag, S + dS, SMin, SMax, t1, T, r, b, v) - 2 * ExtremeSpreadOption(TypeFlag, S, SMin, SMax, t1, T, r, b, v) + ExtremeSpreadOption(TypeFlag, S - dS, SMin, SMax, t1, T, r, b, v)) / dS ^ 2
    ElseIf OutPutFlag = "gv" Then 'DGammaDVol
        EExtremeSpreadOption = (ExtremeSpreadOption(TypeFlag, S + dS, SMin, SMax, t1, T, r, b, v + 0.01) - 2 * ExtremeSpreadOption(TypeFlag, S, SMin, SMax, t1, T, r, b, v + 0.01) + ExtremeSpreadOption(TypeFlag, S - dS, SMin, SMax, t1, T, r, b, v + 0.01) _
      - ExtremeSpreadOption(TypeFlag, S + dS, SMin, SMax, t1, T, r, b, v - 0.01) + 2 * ExtremeSpreadOption(TypeFlag, S, SMin, SMax, t1, T, r, b, v - 0.01) - ExtremeSpreadOption(TypeFlag, S - dS, SMin, SMax, t1, T, r, b, v - 0.01)) / (2 * 0.01 * dS ^ 2) / 100
   ElseIf OutPutFlag = "gp" Then 'GammaP
        EExtremeSpreadOption = S / 100 * (ExtremeSpreadOption(TypeFlag, S + dS, SMin, SMax, t1, T, r, b, v) - 2 * ExtremeSpreadOption(TypeFlag, S, SMin, SMax, t1, T, r, b, v) + ExtremeSpreadOption(TypeFlag, S - dS, SMin, SMax, t1, T, r, b, v)) / dS ^ 2
    ElseIf OutPutFlag = "dddv" Then 'DDeltaDvol
        EExtremeSpreadOption = 1 / (4 * dS * 0.01) * (ExtremeSpreadOption(TypeFlag, S + dS, SMin, SMax, t1, T, r, b, v + 0.01) - ExtremeSpreadOption(TypeFlag, S + dS, SMin, SMax, t1, T, r, b, v - 0.01) _
        - ExtremeSpreadOption(TypeFlag, S - dS, SMin, SMax, t1, T, r, b, v + 0.01) + ExtremeSpreadOption(TypeFlag, S - dS, SMin, SMax, t1, T, r, b, v - 0.01)) / 100
    ElseIf OutPutFlag = "v" Then 'Vega
         EExtremeSpreadOption = (ExtremeSpreadOption(TypeFlag, S, SMin, SMax, t1, T, r, b, v + 0.01) - ExtremeSpreadOption(TypeFlag, S, SMin, SMax, t1, T, r, b, v - 0.01)) / 2
     ElseIf OutPutFlag = "vv" Then 'DvegaDvol/vomma
        EExtremeSpreadOption = (ExtremeSpreadOption(TypeFlag, S, SMin, SMax, t1, T, r, b, v + 0.01) - 2 * ExtremeSpreadOption(TypeFlag, S, SMin, SMax, t1, T, r, b, v) + ExtremeSpreadOption(TypeFlag, S, SMin, SMax, t1, T, r, b, v - 0.01)) / 0.01 ^ 2 / 10000
    ElseIf OutPutFlag = "vp" Then 'VegaP
         EExtremeSpreadOption = v / 0.1 * (ExtremeSpreadOption(TypeFlag, S, SMin, SMax, t1, T, r, b, v + 0.01) - ExtremeSpreadOption(TypeFlag, S, SMin, SMax, t1, T, r, b, v - 0.01)) / 2
     ElseIf OutPutFlag = "dvdv" Then 'DvegaDvol
        EExtremeSpreadOption = (ExtremeSpreadOption(TypeFlag, S, SMin, SMax, t1, T, r, b, v + 0.01) - 2 * ExtremeSpreadOption(TypeFlag, S, SMin, SMax, t1, T, r, b, v) + ExtremeSpreadOption(TypeFlag, S, SMin, SMax, t1, T, r, b, v - 0.01))
    ElseIf OutPutFlag = "t" Then 'Theta
         If t1 <= 1 / 365 Then
                EExtremeSpreadOption = ExtremeSpreadOption(TypeFlag, S, SMin, SMax, 1E-05, T - 1 / 365, r, b, v) - ExtremeSpreadOption(TypeFlag, S, SMin, SMax, t1, T, r, b, v)
        Else
                EExtremeSpreadOption = ExtremeSpreadOption(TypeFlag, S, SMin, SMax, t1 - 1 / 365, T - 1 / 365, r, b, v) - ExtremeSpreadOption(TypeFlag, S, SMin, SMax, t1, T, r, b, v)
        End If
     ElseIf OutPutFlag = "r" Then 'Rho
         EExtremeSpreadOption = (ExtremeSpreadOption(TypeFlag, S, SMin, SMax, t1, T, r + 0.01, b + 0.01, v) - ExtremeSpreadOption(TypeFlag, S, SMin, SMax, t1, T, r - 0.01, b - 0.01, v)) / (2)
    ElseIf OutPutFlag = "f" Then 'Rho2
         EExtremeSpreadOption = (ExtremeSpreadOption(TypeFlag, S, SMin, SMax, t1, T, r, b - 0.01, v) - ExtremeSpreadOption(TypeFlag, S, SMin, SMax, t1, T, r, b + 0.01, v)) / (2)
    ElseIf OutPutFlag = "b" Then 'Carry
        EExtremeSpreadOption = (ExtremeSpreadOption(TypeFlag, S, SMin, SMax, t1, T, r, b + 0.01, v) - ExtremeSpreadOption(TypeFlag, S, SMin, SMax, t1, T, r, b - 0.01, v)) / (2)
    ElseIf OutPutFlag = "s" Then 'Speed
        EExtremeSpreadOption = 1 / dS ^ 3 * (ExtremeSpreadOption(TypeFlag, S + 2 * dS, SMin, SMax, t1, T, r, b, v) - 3 * ExtremeSpreadOption(TypeFlag, S + dS, SMin, SMax, t1, T, r, b, v) _
                                + 3 * ExtremeSpreadOption(TypeFlag, S, SMin, SMax, t1, T, r, b, v) - ExtremeSpreadOption(TypeFlag, S - dS, SMin, SMax, t1, T, r, b, v))
    End If
End Function



'// Fixed strike lookback options
Public Function FixedStrikeLookback(CallPutFlag As String, S As Double, SMin As Double, SMax As Double, x As Double, _
                 T As Double, r As Double, b As Double, v As Double) As Double
    
    Dim d1 As Double, d2 As Double
    Dim e1 As Double, e2 As Double, m As Double
    
    If CallPutFlag = "c" Then
        If S > SMax Then
            SMax = S
        End If
        m = SMax
    ElseIf CallPutFlag = "p" Then
        If S < SMin Then
            SMin = S
        End If
         m = SMin
    End If
    
    d1 = (Log(S / x) + (b + v ^ 2 / 2) * T) / (v * Sqr(T))
    d2 = d1 - v * Sqr(T)
    e1 = (Log(S / m) + (b + v ^ 2 / 2) * T) / (v * Sqr(T))
    e2 = e1 - v * Sqr(T)
    
    If CallPutFlag = "c" And x > m Then
        FixedStrikeLookback = S * Exp((b - r) * T) * CND(d1) - x * Exp(-r * T) * CND(d2) _
        + S * Exp(-r * T) * v ^ 2 / (2 * b) * (-(S / x) ^ (-2 * b / v ^ 2) * CND(d1 - 2 * b / v * Sqr(T)) + Exp(b * T) * CND(d1))
    ElseIf CallPutFlag = "c" And x <= m Then
        FixedStrikeLookback = Exp(-r * T) * (m - x) + S * Exp((b - r) * T) * CND(e1) - Exp(-r * T) * m * CND(e2) _
        + S * Exp(-r * T) * v ^ 2 / (2 * b) * (-(S / m) ^ (-2 * b / v ^ 2) * CND(e1 - 2 * b / v * Sqr(T)) + Exp(b * T) * CND(e1))
    ElseIf CallPutFlag = "p" And x < m Then
        FixedStrikeLookback = -S * Exp((b - r) * T) * CND(-d1) + x * Exp(-r * T) * CND(-d1 + v * Sqr(T)) _
        + S * Exp(-r * T) * v ^ 2 / (2 * b) * ((S / x) ^ (-2 * b / v ^ 2) * CND(-d1 + 2 * b / v * Sqr(T)) - Exp(b * T) * CND(-d1))
    ElseIf CallPutFlag = "p" And x >= m Then
        FixedStrikeLookback = Exp(-r * T) * (x - m) - S * Exp((b - r) * T) * CND(-e1) + Exp(-r * T) * m * CND(-e1 + v * Sqr(T)) _
        + Exp(-r * T) * v ^ 2 / (2 * b) * S * ((S / m) ^ (-2 * b / v ^ 2) * CND(-e1 + 2 * b / v * Sqr(T)) - Exp(b * T) * CND(-e1))
    End If
End Function



Public Function EFixedStrikeLookback(OutPutFlag As String, CallPutFlag As String, S As Double, SMin As Double, SMax As Double, x As Double, T As Double, _
                r As Double, b As Double, v As Double, Optional dS)
            
    If IsMissing(dS) Then
        dS = 0.01
    End If
    
    
    If OutPutFlag = "p" Then ' Value
        EFixedStrikeLookback = FixedStrikeLookback(CallPutFlag, S, SMin, SMax, x, T, r, b, v)
    ElseIf OutPutFlag = "d" Then 'Delta
         EFixedStrikeLookback = (FixedStrikeLookback(CallPutFlag, S + dS, SMin, SMax, x, T, r, b, v) - FixedStrikeLookback(CallPutFlag, S - dS, SMin, SMax, x, T, r, b, v)) / (2 * dS)
    ElseIf OutPutFlag = "e" Then 'Elasticity
         EFixedStrikeLookback = (FixedStrikeLookback(CallPutFlag, S + dS, SMin, SMax, x, T, r, b, v) - FixedStrikeLookback(CallPutFlag, S - dS, SMin, SMax, x, T, r, b, v)) / (2 * dS) * S / FixedStrikeLookback(CallPutFlag, S, SMin, SMax, x, T, r, b, v)
    ElseIf OutPutFlag = "g" Then 'Gamma
        EFixedStrikeLookback = (FixedStrikeLookback(CallPutFlag, S + dS, SMin, SMax, x, T, r, b, v) - 2 * FixedStrikeLookback(CallPutFlag, S, SMin, SMax, x, T, r, b, v) + FixedStrikeLookback(CallPutFlag, S - dS, SMin, SMax, x, T, r, b, v)) / dS ^ 2
    ElseIf OutPutFlag = "gv" Then 'DGammaDVol
        EFixedStrikeLookback = (FixedStrikeLookback(CallPutFlag, S + dS, SMin, SMax, x, T, r, b, v + 0.01) - 2 * FixedStrikeLookback(CallPutFlag, S, SMin, SMax, x, T, r, b, v + 0.01) + FixedStrikeLookback(CallPutFlag, S - dS, SMin, SMax, x, T, r, b, v + 0.01) _
      - FixedStrikeLookback(CallPutFlag, S + dS, SMin, SMax, x, T, r, b, v - 0.01) + 2 * FixedStrikeLookback(CallPutFlag, S, SMin, SMax, x, T, r, b, v - 0.01) - FixedStrikeLookback(CallPutFlag, S - dS, SMin, SMax, x, T, r, b, v - 0.01)) / (2 * 0.01 * dS ^ 2) / 100
   ElseIf OutPutFlag = "gp" Then 'GammaP
        EFixedStrikeLookback = S / 100 * (FixedStrikeLookback(CallPutFlag, S + dS, SMin, SMax, x, T, r, b, v) - 2 * FixedStrikeLookback(CallPutFlag, S, SMin, SMax, x, T, r, b, v) + FixedStrikeLookback(CallPutFlag, S - dS, SMin, SMax, x, T, r, b, v)) / dS ^ 2
    ElseIf OutPutFlag = "dddv" Then 'DDeltaDvol
        EFixedStrikeLookback = 1 / (4 * dS * 0.01) * (FixedStrikeLookback(CallPutFlag, S + dS, SMin, SMax, x, T, r, b, v + 0.01) - FixedStrikeLookback(CallPutFlag, S + dS, SMin, SMax, x, T, r, b, v - 0.01) _
        - FixedStrikeLookback(CallPutFlag, S - dS, SMin, SMax, x, T, r, b, v + 0.01) + FixedStrikeLookback(CallPutFlag, S - dS, SMin, SMax, x, T, r, b, v - 0.01)) / 100
    ElseIf OutPutFlag = "v" Then 'Vega
         EFixedStrikeLookback = (FixedStrikeLookback(CallPutFlag, S, SMin, SMax, x, T, r, b, v + 0.01) - FixedStrikeLookback(CallPutFlag, S, SMin, SMax, x, T, r, b, v - 0.01)) / 2
     ElseIf OutPutFlag = "vv" Then 'DvegaDvol/vomma
        EFixedStrikeLookback = (FixedStrikeLookback(CallPutFlag, S, SMin, SMax, x, T, r, b, v + 0.01) - 2 * FixedStrikeLookback(CallPutFlag, S, SMin, SMax, x, T, r, b, v) + FixedStrikeLookback(CallPutFlag, S, SMin, SMax, x, T, r, b, v - 0.01)) / 0.01 ^ 2 / 10000
    ElseIf OutPutFlag = "vp" Then 'VegaP
         EFixedStrikeLookback = v / 0.1 * (FixedStrikeLookback(CallPutFlag, S, SMin, SMax, x, T, r, b, v + 0.01) - FixedStrikeLookback(CallPutFlag, S, SMin, SMax, x, T, r, b, v - 0.01)) / 2
     ElseIf OutPutFlag = "dvdv" Then 'DvegaDvol
        EFixedStrikeLookback = (FixedStrikeLookback(CallPutFlag, S, SMin, SMax, x, T, r, b, v + 0.01) - 2 * FixedStrikeLookback(CallPutFlag, S, SMin, SMax, x, T, r, b, v) + FixedStrikeLookback(CallPutFlag, S, SMin, SMax, x, T, r, b, v - 0.01))
    ElseIf OutPutFlag = "t" Then 'Theta
         If T <= 1 / 365 Then
                EFixedStrikeLookback = FixedStrikeLookback(CallPutFlag, S, SMin, SMax, x, 1E-05, r, b, v) - FixedStrikeLookback(CallPutFlag, S, SMin, SMax, x, T, r, b, v)
        Else
                EFixedStrikeLookback = FixedStrikeLookback(CallPutFlag, S, SMin, SMax, x, T - 1 / 365, r, b, v) - FixedStrikeLookback(CallPutFlag, S, SMin, SMax, x, T, r, b, v)
        End If
     ElseIf OutPutFlag = "r" Then 'Rho
         EFixedStrikeLookback = (FixedStrikeLookback(CallPutFlag, S, SMin, SMax, x, T, r + 0.01, b + 0.01, v) - FixedStrikeLookback(CallPutFlag, S, SMin, SMax, x, T, r - 0.01, b - 0.01, v)) / (2)
       ElseIf OutPutFlag = "f" Then 'Rho2
         EFixedStrikeLookback = (FixedStrikeLookback(CallPutFlag, S, SMin, SMax, x, T, r, b - 0.01, v) - FixedStrikeLookback(CallPutFlag, S, SMin, SMax, x, T, r, b + 0.01, v)) / (2)
    ElseIf OutPutFlag = "b" Then 'Carry
        EFixedStrikeLookback = (FixedStrikeLookback(CallPutFlag, S, SMin, SMax, x, T, r, b + 0.01, v) - FixedStrikeLookback(CallPutFlag, S, SMin, SMax, x, T, r, b - 0.01, v)) / (2)
    ElseIf OutPutFlag = "s" Then 'Speed
        EFixedStrikeLookback = 1 / dS ^ 3 * (FixedStrikeLookback(CallPutFlag, S + 2 * dS, SMin, SMax, x, T, r, b, v) - 3 * FixedStrikeLookback(CallPutFlag, S + dS, SMin, SMax, x, T, r, b, v) _
                                + 3 * FixedStrikeLookback(CallPutFlag, S, SMin, SMax, x, T, r, b, v) - FixedStrikeLookback(CallPutFlag, S - dS, SMin, SMax, x, T, r, b, v))
      ElseIf OutPutFlag = "dx" Then 'Strike Delta
         EFixedStrikeLookback = (FixedStrikeLookback(CallPutFlag, S, SMin, SMax, x + dS, T, r, b, v) - FixedStrikeLookback(CallPutFlag, S, SMin, SMax, x - dS, T, r, b, v)) / (2 * dS)
     ElseIf OutPutFlag = "dxdx" Then 'Gamma
        EFixedStrikeLookback = (FixedStrikeLookback(CallPutFlag, S, SMin, SMax, x + dS, T, r, b, v) - 2 * FixedStrikeLookback(CallPutFlag, S, SMin, SMax, x, T, r, b, v) + FixedStrikeLookback(CallPutFlag, S, SMin, SMax, x - dS, T, r, b, v)) / dS ^ 2
    End If
End Function



'// Floating strike lookback options
Public Function FloatingStrikeLookback(CallPutFlag As String, S As Double, SMin As Double, SMax As Double, T As Double, _
            r As Double, b As Double, v As Double) As Double

    Dim a1 As Double, a2 As Double, m As Double
    
       If CallPutFlag = "c" Then
        If S > SMax Then
            SMax = S
        End If
        m = SMax
    ElseIf CallPutFlag = "p" Then
        If S < SMin Then
            SMin = S
        End If
         m = SMin
    End If
    
     a1 = (Log(S / m) + (b + v ^ 2 / 2) * T) / (v * Sqr(T))
     a2 = a1 - v * Sqr(T)

    If CallPutFlag = "c" Then
        If b = 0 Then
            FloatingStrikeLookback = S * Exp(-r * T) * CND(a1) - m * Exp(-r * T) * CND(a2) + _
                S * Exp(-r * T) * v * Sqr(T) * (ND(a1) + a1 * (CND(a1) - 1))
                     Else
            FloatingStrikeLookback = S * Exp((b - r) * T) * CND(a1) - m * Exp(-r * T) * CND(a2) + _
                Exp(-r * T) * v ^ 2 / (2 * b) * S * ((S / m) ^ (-2 * b / v ^ 2) * CND(-a1 + 2 * b / v * Sqr(T)) - Exp(b * T) * CND(-a1))
        End If
    ElseIf CallPutFlag = "p" Then
        If b = 0 Then
            FloatingStrikeLookback = m * Exp(-r * T) * CND(-a2) - S * Exp(-r * T) * CND(-a1) + _
                S * Exp(-r * T) * v * Sqr(T) * (ND(a1) + CND(a1) * a1)
        Else
            FloatingStrikeLookback = m * Exp(-r * T) * CND(-a2) - S * Exp((b - r) * T) * CND(-a1) + _
                Exp(-r * T) * v ^ 2 / (2 * b) * S * (-(S / m) ^ (-2 * b / v ^ 2) * CND(a1 - 2 * b / v * Sqr(T)) + Exp(b * T) * CND(a1))
        End If
    End If
End Function



Public Function EFloatingStrikeLookback(OutPutFlag As String, CallPutFlag As String, S As Double, SMin As Double, SMax As Double, T As Double, _
                r As Double, b As Double, v As Double, Optional dS)
            
    If IsMissing(dS) Then
        dS = 0.01
    End If
    
    
    If OutPutFlag = "p" Then ' Value
        EFloatingStrikeLookback = FloatingStrikeLookback(CallPutFlag, S, SMin, SMax, T, r, b, v)
    ElseIf OutPutFlag = "d" Then 'Delta
         EFloatingStrikeLookback = (FloatingStrikeLookback(CallPutFlag, S + dS, SMin, SMax, T, r, b, v) - FloatingStrikeLookback(CallPutFlag, S - dS, SMin, SMax, T, r, b, v)) / (2 * dS)
    ElseIf OutPutFlag = "e" Then 'Elasticity
         EFloatingStrikeLookback = (FloatingStrikeLookback(CallPutFlag, S + dS, SMin, SMax, T, r, b, v) - FloatingStrikeLookback(CallPutFlag, S - dS, SMin, SMax, T, r, b, v)) / (2 * dS) * S / FloatingStrikeLookback(CallPutFlag, S, SMin, SMax, T, r, b, v)
    ElseIf OutPutFlag = "g" Then 'Gamma
        EFloatingStrikeLookback = (FloatingStrikeLookback(CallPutFlag, S + dS, SMin, SMax, T, r, b, v) - 2 * FloatingStrikeLookback(CallPutFlag, S, SMin, SMax, T, r, b, v) + FloatingStrikeLookback(CallPutFlag, S - dS, SMin, SMax, T, r, b, v)) / dS ^ 2
    ElseIf OutPutFlag = "gv" Then 'DGammaDVol
        EFloatingStrikeLookback = (FloatingStrikeLookback(CallPutFlag, S + dS, SMin, SMax, T, r, b, v + 0.01) - 2 * FloatingStrikeLookback(CallPutFlag, S, SMin, SMax, T, r, b, v + 0.01) + FloatingStrikeLookback(CallPutFlag, S - dS, SMin, SMax, T, r, b, v + 0.01) _
      - FloatingStrikeLookback(CallPutFlag, S + dS, SMin, SMax, T, r, b, v - 0.01) + 2 * FloatingStrikeLookback(CallPutFlag, S, SMin, SMax, T, r, b, v - 0.01) - FloatingStrikeLookback(CallPutFlag, S - dS, SMin, SMax, T, r, b, v - 0.01)) / (2 * 0.01 * dS ^ 2) / 100
   ElseIf OutPutFlag = "gp" Then 'GammaP
        EFloatingStrikeLookback = S / 100 * (FloatingStrikeLookback(CallPutFlag, S + dS, SMin, SMax, T, r, b, v) - 2 * FloatingStrikeLookback(CallPutFlag, S, SMin, SMax, T, r, b, v) + FloatingStrikeLookback(CallPutFlag, S - dS, SMin, SMax, T, r, b, v)) / dS ^ 2
    ElseIf OutPutFlag = "dddv" Then 'DDeltaDvol
        EFloatingStrikeLookback = 1 / (4 * dS * 0.01) * (FloatingStrikeLookback(CallPutFlag, S + dS, SMin, SMax, T, r, b, v + 0.01) - FloatingStrikeLookback(CallPutFlag, S + dS, SMin, SMax, T, r, b, v - 0.01) _
        - FloatingStrikeLookback(CallPutFlag, S - dS, SMin, SMax, T, r, b, v + 0.01) + FloatingStrikeLookback(CallPutFlag, S - dS, SMin, SMax, T, r, b, v - 0.01)) / 100
    ElseIf OutPutFlag = "v" Then 'Vega
         EFloatingStrikeLookback = (FloatingStrikeLookback(CallPutFlag, S, SMin, SMax, T, r, b, v + 0.01) - FloatingStrikeLookback(CallPutFlag, S, SMin, SMax, T, r, b, v - 0.01)) / 2
     ElseIf OutPutFlag = "vv" Then 'DvegaDvol/vomma
        EFloatingStrikeLookback = (FloatingStrikeLookback(CallPutFlag, S, SMin, SMax, T, r, b, v + 0.01) - 2 * FloatingStrikeLookback(CallPutFlag, S, SMin, SMax, T, r, b, v) + FloatingStrikeLookback(CallPutFlag, S, SMin, SMax, T, r, b, v - 0.01)) / 0.01 ^ 2 / 10000
    ElseIf OutPutFlag = "vp" Then 'VegaP
         EFloatingStrikeLookback = v / 0.1 * (FloatingStrikeLookback(CallPutFlag, S, SMin, SMax, T, r, b, v + 0.01) - FloatingStrikeLookback(CallPutFlag, S, SMin, SMax, T, r, b, v - 0.01)) / 2
     ElseIf OutPutFlag = "dvdv" Then 'DvegaDvol
        EFloatingStrikeLookback = (FloatingStrikeLookback(CallPutFlag, S, SMin, SMax, T, r, b, v + 0.01) - 2 * FloatingStrikeLookback(CallPutFlag, S, SMin, SMax, T, r, b, v) + FloatingStrikeLookback(CallPutFlag, S, SMin, SMax, T, r, b, v - 0.01))
    ElseIf OutPutFlag = "t" Then 'Theta
         If T <= 1 / 365 Then
                EFloatingStrikeLookback = FloatingStrikeLookback(CallPutFlag, S, SMin, SMax, 1E-05, r, b, v) - FloatingStrikeLookback(CallPutFlag, S, SMin, SMax, T, r, b, v)
        Else
                EFloatingStrikeLookback = FloatingStrikeLookback(CallPutFlag, S, SMin, SMax, T - 1 / 365, r, b, v) - FloatingStrikeLookback(CallPutFlag, S, SMin, SMax, T, r, b, v)
        End If
     ElseIf OutPutFlag = "r" Then 'Rho
         EFloatingStrikeLookback = (FloatingStrikeLookback(CallPutFlag, S, SMin, SMax, T, r + 0.01, b + 0.01, v) - FloatingStrikeLookback(CallPutFlag, S, SMin, SMax, T, r - 0.01, b - 0.01, v)) / (2)
    ElseIf OutPutFlag = "fr" Then 'Futures options rho
         EFloatingStrikeLookback = (FloatingStrikeLookback(CallPutFlag, S, SMin, SMax, T, r + 0.01, b, v) - FloatingStrikeLookback(CallPutFlag, S, SMin, SMax, T, r - 0.01, b, v)) / (2)
     ElseIf OutPutFlag = "f" Then 'Rho2
         EFloatingStrikeLookback = (FloatingStrikeLookback(CallPutFlag, S, SMin, SMax, T, r, b - 0.01, v) - FloatingStrikeLookback(CallPutFlag, S, SMin, SMax, T, r, b + 0.01, v)) / (2)
    ElseIf OutPutFlag = "b" Then 'Carry
        EFloatingStrikeLookback = (FloatingStrikeLookback(CallPutFlag, S, SMin, SMax, T, r, b + 0.01, v) - FloatingStrikeLookback(CallPutFlag, S, SMin, SMax, T, r, b - 0.01, v)) / (2)
    ElseIf OutPutFlag = "s" Then 'Speed
        EFloatingStrikeLookback = 1 / dS ^ 3 * (FloatingStrikeLookback(CallPutFlag, S + 2 * dS, SMin, SMax, T, r, b, v) - 3 * FloatingStrikeLookback(CallPutFlag, S + dS, SMin, SMax, T, r, b, v) _
                                + 3 * FloatingStrikeLookback(CallPutFlag, S, SMin, SMax, T, r, b, v) - FloatingStrikeLookback(CallPutFlag, S - dS, SMin, SMax, T, r, b, v))
    End If
End Function


'// Partial-time fixed strike lookback options
Public Function PartialFixedLB(CallPutFlag As String, S As Double, x As Double, t1 As Double, _
                T2 As Double, r As Double, b As Double, v As Double) As Double

    Dim d1 As Double, d2 As Double
    Dim e1 As Double, e2 As Double
    Dim f1 As Double, f2 As Double

    d1 = (Log(S / x) + (b + v ^ 2 / 2) * T2) / (v * Sqr(T2))
    d2 = d1 - v * Sqr(T2)
    e1 = ((b + v ^ 2 / 2) * (T2 - t1)) / (v * Sqr(T2 - t1))
    e2 = e1 - v * Sqr(T2 - t1)
    f1 = (Log(S / x) + (b + v ^ 2 / 2) * t1) / (v * Sqr(t1))
    f2 = f1 - v * Sqr(t1)
    If CallPutFlag = "c" Then
        PartialFixedLB = S * Exp((b - r) * T2) * CND(d1) - Exp(-r * T2) * x * CND(d2) + S * Exp(-r * T2) * v ^ 2 / (2 * b) * (-(S / x) ^ (-2 * b / v ^ 2) * CBND(d1 - 2 * b * Sqr(T2) / v, -f1 + 2 * b * Sqr(t1) / v, -Sqr(t1 / T2)) + Exp(b * T2) * CBND(e1, d1, Sqr(1 - t1 / T2))) - S * Exp((b - r) * T2) * CBND(-e1, d1, -Sqr(1 - t1 / T2)) - x * Exp(-r * T2) * CBND(f2, -d2, -Sqr(t1 / T2)) + Exp(-b * (T2 - t1)) * (1 - v ^ 2 / (2 * b)) * S * Exp((b - r) * T2) * CND(f1) * CND(-e2)
    ElseIf CallPutFlag = "p" Then
        PartialFixedLB = x * Exp(-r * T2) * CND(-d2) - S * Exp((b - r) * T2) * CND(-d1) + S * Exp(-r * T2) * v ^ 2 / (2 * b) * ((S / x) ^ (-2 * b / v ^ 2) * CBND(-d1 + 2 * b * Sqr(T2) / v, f1 - 2 * b * Sqr(t1) / v, -Sqr(t1 / T2)) - Exp(b * T2) * CBND(-e1, -d1, Sqr(1 - t1 / T2))) + S * Exp((b - r) * T2) * CBND(e1, -d1, -Sqr(1 - t1 / T2)) + x * Exp(-r * T2) * CBND(-f2, d2, -Sqr(t1 / T2)) - Exp(-b * (T2 - t1)) * (1 - v ^ 2 / (2 * b)) * S * Exp((b - r) * T2) * CND(-f1) * CND(e2)
    End If
End Function






Public Function EPartialFixedLB(OutPutFlag As String, CallPutFlag As String, S As Double, x As Double, t1 As Double, T As Double, _
                r As Double, b As Double, v As Double, Optional dS)
            
    If IsMissing(dS) Then
        dS = 0.01
    End If
    
    
    If OutPutFlag = "p" Then ' Value
        EPartialFixedLB = PartialFixedLB(CallPutFlag, S, x, t1, T, r, b, v)
    ElseIf OutPutFlag = "d" Then 'Delta
         EPartialFixedLB = (PartialFixedLB(CallPutFlag, S + dS, x, t1, T, r, b, v) - PartialFixedLB(CallPutFlag, S - dS, x, t1, T, r, b, v)) / (2 * dS)
    ElseIf OutPutFlag = "e" Then 'Elasticity
         EPartialFixedLB = (PartialFixedLB(CallPutFlag, S + dS, x, t1, T, r, b, v) - PartialFixedLB(CallPutFlag, S - dS, x, t1, T, r, b, v)) / (2 * dS) * S / PartialFixedLB(CallPutFlag, S, x, t1, T, r, b, v)
    ElseIf OutPutFlag = "g" Then 'Gamma
        EPartialFixedLB = (PartialFixedLB(CallPutFlag, S + dS, x, t1, T, r, b, v) - 2 * PartialFixedLB(CallPutFlag, S, x, t1, T, r, b, v) + PartialFixedLB(CallPutFlag, S - dS, x, t1, T, r, b, v)) / dS ^ 2
    ElseIf OutPutFlag = "gv" Then 'DGammaDVol
        EPartialFixedLB = (PartialFixedLB(CallPutFlag, S + dS, x, t1, T, r, b, v + 0.01) - 2 * PartialFixedLB(CallPutFlag, S, x, t1, T, r, b, v + 0.01) + PartialFixedLB(CallPutFlag, S - dS, x, t1, T, r, b, v + 0.01) _
      - PartialFixedLB(CallPutFlag, S + dS, x, t1, T, r, b, v - 0.01) + 2 * PartialFixedLB(CallPutFlag, S, x, t1, T, r, b, v - 0.01) - PartialFixedLB(CallPutFlag, S - dS, x, t1, T, r, b, v - 0.01)) / (2 * 0.01 * dS ^ 2) / 100
   ElseIf OutPutFlag = "gp" Then 'GammaP
        EPartialFixedLB = S / 100 * (PartialFixedLB(CallPutFlag, S + dS, x, t1, T, r, b, v) - 2 * PartialFixedLB(CallPutFlag, S, x, t1, T, r, b, v) + PartialFixedLB(CallPutFlag, S - dS, x, t1, T, r, b, v)) / dS ^ 2
    ElseIf OutPutFlag = "dddv" Then 'DDeltaDvol
        EPartialFixedLB = 1 / (4 * dS * 0.01) * (PartialFixedLB(CallPutFlag, S + dS, x, t1, T, r, b, v + 0.01) - PartialFixedLB(CallPutFlag, S + dS, x, t1, T, r, b, v - 0.01) _
        - PartialFixedLB(CallPutFlag, S - dS, x, t1, T, r, b, v + 0.01) + PartialFixedLB(CallPutFlag, S - dS, x, t1, T, r, b, v - 0.01)) / 100
    ElseIf OutPutFlag = "v" Then 'Vega
         EPartialFixedLB = (PartialFixedLB(CallPutFlag, S, x, t1, T, r, b, v + 0.01) - PartialFixedLB(CallPutFlag, S, x, t1, T, r, b, v - 0.01)) / 2
     ElseIf OutPutFlag = "vv" Then 'DvegaDvol/vomma
        EPartialFixedLB = (PartialFixedLB(CallPutFlag, S, x, t1, T, r, b, v + 0.01) - 2 * PartialFixedLB(CallPutFlag, S, x, t1, T, r, b, v) + PartialFixedLB(CallPutFlag, S, x, t1, T, r, b, v - 0.01)) / 0.01 ^ 2 / 10000
    ElseIf OutPutFlag = "vp" Then 'VegaP
         EPartialFixedLB = v / 0.1 * (PartialFixedLB(CallPutFlag, S, x, t1, T, r, b, v + 0.01) - PartialFixedLB(CallPutFlag, S, x, t1, T, r, b, v - 0.01)) / 2
     ElseIf OutPutFlag = "dvdv" Then 'DvegaDvol
        EPartialFixedLB = (PartialFixedLB(CallPutFlag, S, x, t1, T, r, b, v + 0.01) - 2 * PartialFixedLB(CallPutFlag, S, x, t1, T, r, b, v) + PartialFixedLB(CallPutFlag, S, x, t1, T, r, b, v - 0.01))
    ElseIf OutPutFlag = "t" Then 'Theta
         If t1 <= 1 / 365 Then
                EPartialFixedLB = PartialFixedLB(CallPutFlag, S, x, 1E-05, T - 1 / 365, r, b, v) - PartialFixedLB(CallPutFlag, S, x, t1, T, r, b, v)
        Else
                EPartialFixedLB = PartialFixedLB(CallPutFlag, S, x, t1 - 1 / 365, T - 1 / 365, r, b, v) - PartialFixedLB(CallPutFlag, S, x, t1, T, r, b, v)
        End If
     ElseIf OutPutFlag = "r" Then 'Rho
         EPartialFixedLB = (PartialFixedLB(CallPutFlag, S, x, t1, T, r + 0.01, b + 0.01, v) - PartialFixedLB(CallPutFlag, S, x, t1, T, r - 0.01, b - 0.01, v)) / (2)
    ElseIf OutPutFlag = "f" Then 'Rho2
         EPartialFixedLB = (PartialFixedLB(CallPutFlag, S, x, t1, T, r, b - 0.01, v) - PartialFixedLB(CallPutFlag, S, x, t1, T, r, b + 0.01, v)) / (2)
    ElseIf OutPutFlag = "b" Then 'Carry
        EPartialFixedLB = (PartialFixedLB(CallPutFlag, S, x, t1, T, r, b + 0.01, v) - PartialFixedLB(CallPutFlag, S, x, t1, T, r, b - 0.01, v)) / (2)
    ElseIf OutPutFlag = "s" Then 'Speed
        EPartialFixedLB = 1 / dS ^ 3 * (PartialFixedLB(CallPutFlag, S + 2 * dS, x, t1, T, r, b, v) - 3 * PartialFixedLB(CallPutFlag, S + dS, x, t1, T, r, b, v) _
                                + 3 * PartialFixedLB(CallPutFlag, S, x, t1, T, r, b, v) - PartialFixedLB(CallPutFlag, S - dS, x, t1, T, r, b, v))
      ElseIf OutPutFlag = "dx" Then 'Strike Delta
         EPartialFixedLB = (PartialFixedLB(CallPutFlag, S, x + dS, t1, T, r, b, v) - PartialFixedLB(CallPutFlag, S, x - dS, t1, T, r, b, v)) / (2 * dS)
     ElseIf OutPutFlag = "dxdx" Then 'Gamma
        EPartialFixedLB = (PartialFixedLB(CallPutFlag, S, x + dS, t1, T, r, b, v) - 2 * PartialFixedLB(CallPutFlag, S, x, t1, T, r, b, v) + PartialFixedLB(CallPutFlag, S, x - dS, t1, T, r, b, v)) / dS ^ 2
    End If
End Function




'// Partial-time floating strike lookback options
Public Function PartialFloatLB(CallPutFlag As String, S As Double, SMin As Double, SMax As Double, t1 As Double, _
                T2 As Double, r As Double, b As Double, v As Double, lambda As Double)
   
    Dim d1 As Double, d2 As Double
    Dim e1 As Double, e2 As Double
    Dim f1 As Double, f2 As Double
    Dim g1 As Double, g2 As Double, m As Double
    Dim part1 As Double, part2 As Double, part3 As Double
    
    If CallPutFlag = "c" Then
        m = SMin
    ElseIf CallPutFlag = "p" Then
        m = SMax
    End If
    
    d1 = (Log(S / m) + (b + v ^ 2 / 2) * T2) / (v * Sqr(T2))
    d2 = d1 - v * Sqr(T2)
    e1 = (b + v ^ 2 / 2) * (T2 - t1) / (v * Sqr(T2 - t1))
    e2 = e1 - v * Sqr(T2 - t1)
    f1 = (Log(S / m) + (b + v ^ 2 / 2) * t1) / (v * Sqr(t1))
    f2 = f1 - v * Sqr(t1)
    g1 = Log(lambda) / (v * Sqr(T2))
    g2 = Log(lambda) / (v * Sqr(T2 - t1))

    If CallPutFlag = "c" Then
        part1 = S * Exp((b - r) * T2) * CND(d1 - g1) - lambda * m * Exp(-r * T2) * CND(d2 - g1)
        part2 = Exp(-r * T2) * v ^ 2 / (2 * b) * lambda * S * ((S / m) ^ (-2 * b / v ^ 2) * CBND(-f1 + 2 * b * Sqr(t1) / v, -d1 + 2 * b * Sqr(T2) / v - g1, Sqr(t1 / T2)) _
        - Exp(b * T2) * lambda ^ (2 * b / v ^ 2) * CBND(-d1 - g1, e1 + g2, -Sqr(1 - t1 / T2))) _
        + S * Exp((b - r) * T2) * CBND(-d1 + g1, e1 - g2, -Sqr(1 - t1 / T2))
        part3 = Exp(-r * T2) * lambda * m * CBND(-f2, d2 - g1, -Sqr(t1 / T2)) _
        - Exp(-b * (T2 - t1)) * Exp((b - r) * T2) * (1 + v ^ 2 / (2 * b)) * lambda * S * CND(e2 - g2) * CND(-f1)
    
    ElseIf CallPutFlag = "p" Then
        part1 = lambda * m * Exp(-r * T2) * CND(-d2 + g1) - S * Exp((b - r) * T2) * CND(-d1 + g1)
        part2 = -Exp(-r * T2) * v ^ 2 / (2 * b) * lambda * S * ((S / m) ^ (-2 * b / v ^ 2) * CBND(f1 - 2 * b * Sqr(t1) / v, d1 - 2 * b * Sqr(T2) / v + g1, Sqr(t1 / T2)) _
        - Exp(b * T2) * lambda ^ (2 * b / v ^ 2) * CBND(d1 + g1, -e1 - g2, -Sqr(1 - t1 / T2))) _
        - S * Exp((b - r) * T2) * CBND(d1 - g1, -e1 + g2, -Sqr(1 - t1 / T2))
        part3 = -Exp(-r * T2) * lambda * m * CBND(f2, -d2 + g1, -Sqr(t1 / T2)) _
        + Exp(-b * (T2 - t1)) * Exp((b - r) * T2) * (1 + v ^ 2 / (2 * b)) * lambda * S * CND(-e2 + g2) * CND(f1)
  End If
  PartialFloatLB = part1 + part2 + part3
End Function

Public Function EPartialFloatLB(OutPutFlag As String, CallPutFlag As String, S As Double, SMin As Double, SMax As Double, t1 As Double, T As Double, _
                r As Double, b As Double, v As Double, lambda As Double, Optional dS)
            
    If IsMissing(dS) Then
        dS = 0.01
    End If
    
    
    If OutPutFlag = "p" Then ' Value
        EPartialFloatLB = PartialFloatLB(CallPutFlag, S, SMin, SMax, t1, T, r, b, v, lambda)
    ElseIf OutPutFlag = "d" Then 'Delta
         EPartialFloatLB = (PartialFloatLB(CallPutFlag, S + dS, SMin, SMax, t1, T, r, b, v, lambda) - PartialFloatLB(CallPutFlag, S - dS, SMin, SMax, t1, T, r, b, v, lambda)) / (2 * dS)
    ElseIf OutPutFlag = "e" Then 'Elasticity
         EPartialFloatLB = (PartialFloatLB(CallPutFlag, S + dS, SMin, SMax, t1, T, r, b, v, lambda) - PartialFloatLB(CallPutFlag, S - dS, SMin, SMax, t1, T, r, b, v, lambda)) / (2 * dS) * S / PartialFloatLB(CallPutFlag, S, SMin, SMax, t1, T, r, b, v, lambda)
    ElseIf OutPutFlag = "g" Then 'Gamma
        EPartialFloatLB = (PartialFloatLB(CallPutFlag, S + dS, SMin, SMax, t1, T, r, b, v, lambda) - 2 * PartialFloatLB(CallPutFlag, S, SMin, SMax, t1, T, r, b, v, lambda) + PartialFloatLB(CallPutFlag, S - dS, SMin, SMax, t1, T, r, b, v, lambda)) / dS ^ 2
    ElseIf OutPutFlag = "gv" Then 'DGammaDVol
        EPartialFloatLB = (PartialFloatLB(CallPutFlag, S + dS, SMin, SMax, t1, T, r, b, v + 0.01, lambda) - 2 * PartialFloatLB(CallPutFlag, S, SMin, SMax, t1, T, r, b, v + 0.01, lambda) + PartialFloatLB(CallPutFlag, S - dS, SMin, SMax, t1, T, r, b, v + 0.01, lambda) _
      - PartialFloatLB(CallPutFlag, S + dS, SMin, SMax, t1, T, r, b, v - 0.01, lambda) + 2 * PartialFloatLB(CallPutFlag, S, SMin, SMax, t1, T, r, b, v - 0.01, lambda) - PartialFloatLB(CallPutFlag, S - dS, SMin, SMax, t1, T, r, b, v - 0.01, lambda)) / (2 * 0.01 * dS ^ 2) / 100
   ElseIf OutPutFlag = "gp" Then 'GammaP
        EPartialFloatLB = S / 100 * (PartialFloatLB(CallPutFlag, S + dS, SMin, SMax, t1, T, r, b, v, lambda) - 2 * PartialFloatLB(CallPutFlag, S, SMin, SMax, t1, T, r, b, v, lambda) + PartialFloatLB(CallPutFlag, S - dS, SMin, SMax, t1, T, r, b, v, lambda)) / dS ^ 2
    ElseIf OutPutFlag = "dddv" Then 'DDeltaDvol
        EPartialFloatLB = 1 / (4 * dS * 0.01) * (PartialFloatLB(CallPutFlag, S + dS, SMin, SMax, t1, T, r, b, v + 0.01, lambda) - PartialFloatLB(CallPutFlag, S + dS, SMin, SMax, t1, T, r, b, v - 0.01, lambda) _
        - PartialFloatLB(CallPutFlag, S - dS, SMin, SMax, t1, T, r, b, v + 0.01, lambda) + PartialFloatLB(CallPutFlag, S - dS, SMin, SMax, t1, T, r, b, v - 0.01, lambda)) / 100
    ElseIf OutPutFlag = "v" Then 'Vega
         EPartialFloatLB = (PartialFloatLB(CallPutFlag, S, SMin, SMax, t1, T, r, b, v + 0.01, lambda) - PartialFloatLB(CallPutFlag, S, SMin, SMax, t1, T, r, b, v - 0.01, lambda)) / 2
     ElseIf OutPutFlag = "vv" Then 'DvegaDvol/vomma
        EPartialFloatLB = (PartialFloatLB(CallPutFlag, S, SMin, SMax, t1, T, r, b, v + 0.01, lambda) - 2 * PartialFloatLB(CallPutFlag, S, SMin, SMax, t1, T, r, b, v, lambda) + PartialFloatLB(CallPutFlag, S, SMin, SMax, t1, T, r, b, v - 0.01, lambda)) / 0.01 ^ 2 / 10000
    ElseIf OutPutFlag = "vp" Then 'VegaP
         EPartialFloatLB = v / 0.1 * (PartialFloatLB(CallPutFlag, S, SMin, SMax, t1, T, r, b, v + 0.01, lambda) - PartialFloatLB(CallPutFlag, S, SMin, SMax, t1, T, r, b, v - 0.01, lambda)) / 2
     ElseIf OutPutFlag = "dvdv" Then 'DvegaDvol
        EPartialFloatLB = (PartialFloatLB(CallPutFlag, S, SMin, SMax, t1, T, r, b, v + 0.01, lambda) - 2 * PartialFloatLB(CallPutFlag, S, SMin, SMax, t1, T, r, b, v, lambda) + PartialFloatLB(CallPutFlag, S, SMin, SMax, t1, T, r, b, v - 0.01, lambda))
    ElseIf OutPutFlag = "t" Then 'Theta
         If t1 <= 1 / 365 Then
                EPartialFloatLB = PartialFloatLB(CallPutFlag, S, SMin, SMax, 1E-05, T - 1 / 365, r, b, v, lambda) - PartialFloatLB(CallPutFlag, S, SMin, SMax, t1, T, r, b, v, lambda)
        Else
                EPartialFloatLB = PartialFloatLB(CallPutFlag, S, SMin, SMax, t1 - 1 / 365, T - 1 / 365, r, b, v, lambda) - PartialFloatLB(CallPutFlag, S, SMin, SMax, t1, T, r, b, v, lambda)
        End If
     ElseIf OutPutFlag = "r" Then 'Rho
         EPartialFloatLB = (PartialFloatLB(CallPutFlag, S, SMin, SMax, t1, T, r + 0.01, b + 0.01, v, lambda) - PartialFloatLB(CallPutFlag, S, SMin, SMax, t1, T, r - 0.01, b - 0.01, v, lambda)) / (2)
     ElseIf OutPutFlag = "f" Then 'Rho2
         EPartialFloatLB = (PartialFloatLB(CallPutFlag, S, SMin, SMax, t1, T, r, b - 0.01, v, lambda) - PartialFloatLB(CallPutFlag, S, SMin, SMax, t1, T, r, b + 0.01, v, lambda)) / (2)
    ElseIf OutPutFlag = "b" Then 'Carry
        EPartialFloatLB = (PartialFloatLB(CallPutFlag, S, SMin, SMax, t1, T, r, b + 0.01, v, lambda) - PartialFloatLB(CallPutFlag, S, SMin, SMax, t1, T, r, b - 0.01, v, lambda)) / (2)
    ElseIf OutPutFlag = "s" Then 'Speed
        EPartialFloatLB = 1 / dS ^ 3 * (PartialFloatLB(CallPutFlag, S + 2 * dS, SMin, SMax, t1, T, r, b, v, lambda) - 3 * PartialFloatLB(CallPutFlag, S + dS, SMin, SMax, t1, T, r, b, v, lambda) _
                                + 3 * PartialFloatLB(CallPutFlag, S, SMin, SMax, t1, T, r, b, v, lambda) - PartialFloatLB(CallPutFlag, S - dS, SMin, SMax, t1, T, r, b, v, lambda))
    End If
End Function


