---
title: 2.1 Kinematics & Dynamics
sidebar_label: 2.1 Kinematics & Dynamics
---

# Kinematics & Dynamics

![Industrial robot arm demonstrating complex joint movements](https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=600&fit=crop)

> **Why this matters:** Before you can make a robot move, you need to understand _how_ it moves. Kinematics is the geometry of motion. Dynamics adds forces and torques.

## Introduction: The Mathematics of Movement

Every movement a robot makes—from picking up a cup to walking across a room—is governed by kinematics and dynamics. These are not abstract mathematical concepts; they are the toolbox every robotics engineer uses daily.

---

## Forward Kinematics

**Question**: Given joint angles, where is the end effector?

### The Kinematic Chain

```mermaid
graph LR
    A[Base] --> B[Joint 1]
    B --> C[Link 1]
    C --> D[Joint 2]
    D --> E[Link 2]
    E --> F[End Effector]
```

### Transformation Matrices

Each joint adds a transformation:

```
T_end = T_1 × T_2 × T_3 × ... × T_n
```

For a rotation about the z-axis:

```
R_z(θ) = | cos(θ)  -sin(θ)  0 |
         | sin(θ)   cos(θ)  0 |
         |   0        0     1 |
```

### Implementation

```python
import numpy as np

def forward_kinematics(joint_angles, link_lengths):
    """
    Calculate end effector position from joint angles.
    """
    x, y = 0, 0
    angle_sum = 0

    for theta, length in zip(joint_angles, link_lengths):
        angle_sum += theta
        x += length * np.cos(angle_sum)
        y += length * np.sin(angle_sum)

    return x, y, angle_sum
```

![Denavit-Hartenberg parameters visualization](https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=1200&h=500&fit=crop)

---

## Inverse Kinematics

**Question**: Given a target position, what joint angles get us there?

### The Challenge

Inverse kinematics (IK) is harder than forward kinematics:

- **Non-unique solutions**: Multiple joint configurations can reach the same point
- **Unreachable targets**: Some positions are outside the workspace
- **Singularities**: Configurations where the math breaks down

### Analytical vs. Numerical IK

| Approach       | Pros                | Cons                         |
| -------------- | ------------------- | ---------------------------- |
| **Analytical** | Fast, exact         | Only works for simple chains |
| **Numerical**  | Works for any robot | Slower, may not converge     |

### Jacobian-Based IK

The Jacobian relates joint velocities to end effector velocities:

```
ẋ = J(θ) × θ̇
```

To solve IK iteratively:

```
Δθ = J⁻¹ × Δx
```

:::warning Singularities
When `det(J) = 0`, the robot is in a singularity. The arm is either fully extended or folded in a way that makes certain movements impossible.
:::

---

## Dynamics: Adding Forces

Kinematics tells you _where_ things go. Dynamics tells you _what forces_ are needed.

### The Equations of Motion

For a robot with n joints:

```
M(θ)×θ̈ + C(θ,θ̇)×θ̇ + G(θ) = τ
```

Where:

- `M(θ)` = Mass/inertia matrix
- `C(θ,θ̇)` = Coriolis/centrifugal terms
- `G(θ)` = Gravity terms
- `τ` = Joint torques

### Inverse Dynamics

Used in computed torque control:

```python
def inverse_dynamics(q, dq, ddq, robot_model):
    """
    Calculate required torques for desired motion.
    """
    M = robot_model.mass_matrix(q)
    C = robot_model.coriolis_matrix(q, dq)
    G = robot_model.gravity_vector(q)

    return M @ ddq + C @ dq + G
```

![Force diagram of a robot arm with gravity vectors](https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1200&h=500&fit=crop)

---

## Humanoid Specifics

Humanoids are not just more complex robot arms—they have unique challenges.

### Floating Base

Unlike a fixed arm, a humanoid's base (pelvis) moves freely:

```mermaid
graph TD
    A[World Frame] --> B[Floating Base<br/>6 DOF]
    B --> C[Left Leg<br/>6 DOF]
    B --> D[Right Leg<br/>6 DOF]
    B --> E[Torso<br/>3 DOF]
    E --> F[Left Arm<br/>7 DOF]
    E --> G[Right Arm<br/>7 DOF]
```

Total: **35+ degrees of freedom**

### Center of Mass

The CoM must stay above the support polygon:

```
x_CoM = Σ(m_i × x_i) / Σ(m_i)
```

| Stance         | Support Polygon  |
| -------------- | ---------------- |
| Double support | Large rectangle  |
| Single support | Small foot shape |
| Mid-swing      | Very small       |

---

## Tools & Libraries

### Pinocchio (C++/Python)

Industry-standard for rigid body dynamics:

```python
import pinocchio as pin

# Load robot model
model = pin.buildModelFromUrdf("humanoid.urdf")
data = model.createData()

# Compute kinematics
pin.forwardKinematics(model, data, q)
pin.updateFramePlacements(model, data)

# Get end effector position
ee_pos = data.oMf[frame_id].translation
```

### Drake (C++)

Google's robotics toolkit:

```cpp
MultibodyPlant<double> plant;
Parser(&plant).AddModelFromFile("robot.sdf");
plant.Finalize();

auto context = plant.CreateDefaultContext();
plant.SetPositions(context.get(), q);
```

---

## Key Takeaways

:::note Summary

1. **Forward kinematics** maps joint angles to end effector pose
2. **Inverse kinematics** maps target pose to joint angles
3. **Dynamics** adds forces, masses, and accelerations
4. **The Jacobian** connects joint and Cartesian velocities
5. **Humanoids** add complexity with floating bases and many DOFs
   :::

---

## Further Reading

- **Chapter 2.2**: [Actuation & Control](/docs/module-02-hardware/actuation-control)
- **Chapter 2.3**: [Locomotion & Balance](/docs/module-02-hardware/locomotion-balance)
- **Chapter 3.2**: [Control Stack](/docs/module-03-software/control-stack)
