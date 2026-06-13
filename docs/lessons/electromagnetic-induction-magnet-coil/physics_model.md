# 物理模型说明

## 模型边界

本课件采用教学可视化近似模型，不做完整三维电磁场数值模拟。模型目标是稳定呈现高中课堂关注的关系：

- 磁铁静止时，感应电动势接近 0。
- 磁铁运动越快，磁通量变化率越大，感应电动势越大。
- 线圈匝数越多，感应电动势越大。
- 运动方向反向时，感应电动势变号，电流方向反向。

## 核心公式

使用位置相关的磁耦合函数近似磁铁与线圈的耦合：

```text
coupling(x) = exp(-x^2 / (2s^2))
Φ = B * A * coupling(x)
e = -N * dΦ/dt = -N * dΦ/dx * dx/dt
```

其中：

- `x`：磁铁相对线圈中心的位置。
- `B`：磁场强度。
- `A`：等效线圈面积。
- `N`：线圈匝数。
- `dx/dt`：磁铁速度。

## Pure Functions

模型函数位于 `src/lib/induction.ts`：

- `magneticCoupling(position, scale)`
- `magneticCouplingDerivative(position, scale)`
- `calculateFlux(params)`
- `calculateEmf(params)`
- `calculateInductionState(params)`
- `directionFromEmf(emf)`
- `explainLenzLaw(fluxTrend, currentDirection)`

## 测试覆盖

测试位于 `src/lib/induction.test.ts`，覆盖：

- 静止时感应电动势接近 0。
- 速度增大时电动势幅值增大。
- 匝数增大时电动势幅值增大。
- 运动方向反向时电动势变号。
