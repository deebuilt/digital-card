// Opsette Header — per-app configuration for Digital Card.
// See ../../../_shared/opsette-header/INTEGRATION.md.

import type { OpsetteHeaderConfig } from "./config.template";

export type { OpsetteHeaderConfig };

export const opsetteHeaderConfig: OpsetteHeaderConfig = {
  toolName: "Digital Card",
  brandIconPaths: `
    <line x1="152" y1="112" x2="192" y2="112" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/>
    <line x1="152" y1="144" x2="192" y2="144" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/>
    <rect x="32" y="48" width="192" height="160" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/>
    <circle cx="96" cy="120" r="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/>
    <path d="M64,168c3.55-13.8,17.09-24,32-24s28.46,10.19,32,24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/>
  `,
};
