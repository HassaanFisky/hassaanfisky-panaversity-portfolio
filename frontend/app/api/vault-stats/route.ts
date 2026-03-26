import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    // Navigate to the vault root from the web folder
    const vaultPath = path.resolve(process.cwd(), "..", "AI_Employee_Vault");
    
    // Check folder counts
    const getCount = (folder: string) => {
      const p = path.join(vaultPath, folder);
      try {
        return fs.readdirSync(p).filter(f => !f.startsWith('.')).length;
      } catch (e) {
        return 0;
      }
    };

    const stats = {
      needs_action: getCount("Needs_Action"),
      pending_approval: getCount("Pending_Approval"),
      done: getCount("Done"),
      briefings: getCount("Briefings"),
      plans: getCount("Plans")
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Failed to fetch vault stats:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
