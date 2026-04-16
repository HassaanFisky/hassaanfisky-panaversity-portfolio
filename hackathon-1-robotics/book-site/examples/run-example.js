/**
 * run-example.js - Physical AI & Humanoid Robotics Demonstration
 *
 * This example demonstrates basic humanoid robot concepts including:
 * - Forward kinematics calculations
 * - Robot state management
 * - Simple motion planning
 *
 * Run with: node run-example.js
 * After: npm install mathjs dotenv
 */

require("dotenv").config();
const math = require("mathjs");

// ============================================
// 1. ROBOT CONFIGURATION
// ============================================
const robotConfig = {
  name: "HumanoidBot-01",
  dof: 6, // Degrees of freedom for arm
  linkLengths: [0.3, 0.28, 0.15, 0.12, 0.08, 0.05],
  jointLimits: {
    min: [-180, -90, -120, -180, -90, -45],
    max: [180, 90, 120, 180, 90, 45],
  },
};

// ============================================
// 2. FORWARD KINEMATICS
// ============================================
function computeForwardKinematics(jointAngles, linkLengths) {
  let x = 0,
    y = 0,
    cumulativeAngle = 0;

  for (let i = 0; i < jointAngles.length; i++) {
    const angleRad = jointAngles[i] * (Math.PI / 180);
    cumulativeAngle += angleRad;
    x += linkLengths[i] * Math.cos(cumulativeAngle);
    y += linkLengths[i] * Math.sin(cumulativeAngle);
  }

  return {
    x: math.round(x, 4),
    y: math.round(y, 4),
    totalReach: math.round(Math.sqrt(x * x + y * y), 4),
  };
}

// ============================================
// 3. ROBOT STATE MANAGER
// ============================================
class RobotStateManager {
  constructor(config) {
    this.config = config;
    this.jointPositions = new Array(config.dof).fill(0);
    this.state = "IDLE";
    this.history = [];
  }

  setJoints(positions) {
    if (positions.length !== this.config.dof) {
      throw new Error(`Expected ${this.config.dof} joint positions`);
    }

    // Apply joint limits
    this.jointPositions = positions.map((pos, i) => {
      const min = this.config.jointLimits.min[i];
      const max = this.config.jointLimits.max[i];
      return Math.max(min, Math.min(max, pos));
    });

    this.history.push([...this.jointPositions]);
    this.state = "POSITIONED";
    return this;
  }

  getEndEffectorPosition() {
    return computeForwardKinematics(
      this.jointPositions,
      this.config.linkLengths
    );
  }

  printStatus() {
    console.log(`\n[${this.config.name}] Status: ${this.state}`);
    console.log(`Joints: [${this.jointPositions.join(", ")}]°`);
    const pos = this.getEndEffectorPosition();
    console.log(
      `End-Effector: x=${pos.x}m, y=${pos.y}m, reach=${pos.totalReach}m`
    );
  }
}

// ============================================
// 4. SIMPLE MOTION PLANNER
// ============================================
function planLinearMotion(start, end, steps = 5) {
  const trajectory = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const waypoint = start.map((s, j) => math.round(s + t * (end[j] - s), 2));
    trajectory.push(waypoint);
  }
  return trajectory;
}

// ============================================
// 5. MAIN EXECUTION
// ============================================
function main() {
  console.log("╔══════════════════════════════════════════════════╗");
  console.log("║   Physical AI & Humanoid Robotics - Demo         ║");
  console.log("╚══════════════════════════════════════════════════╝\n");

  // Initialize robot
  console.log("► Initializing robot...");
  const robot = new RobotStateManager(robotConfig);
  robot.printStatus();

  // Set initial pose
  console.log("\n► Setting initial pose...");
  robot.setJoints([30, 45, -15, 20, 10, 5]);
  robot.printStatus();

  // Plan motion to target
  console.log("\n► Planning motion to target pose...");
  const startPose = [30, 45, -15, 20, 10, 5];
  const endPose = [60, 30, 45, -30, 25, 15];
  const trajectory = planLinearMotion(startPose, endPose, 4);

  console.log("Trajectory waypoints:");
  trajectory.forEach((wp, i) => {
    console.log(`  Step ${i}: [${wp.join(", ")}]°`);
  });

  // Execute trajectory
  console.log("\n► Executing trajectory...");
  trajectory.forEach((waypoint, i) => {
    robot.setJoints(waypoint);
    const pos = robot.getEndEffectorPosition();
    console.log(`  Step ${i}: reach=${pos.totalReach}m`);
  });

  // Final status
  robot.printStatus();

  console.log("\n╔══════════════════════════════════════════════════╗");
  console.log("║   ✓ Demo completed successfully!                 ║");
  console.log("╚══════════════════════════════════════════════════╝");

  return 0;
}

// Run the demo
process.exit(main());
