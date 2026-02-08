import { existsSync } from 'fs';
import { homedir } from 'os';
import { join } from 'path';

export type AIAssistant = 'claude' | 'cursor' | 'windsurf' | 'continue' | 'unknown';

export interface AssistantConfig {
  name: string;
  skillsPath: string;
  detected: boolean;
}

export function detectAIAssistant(specified?: string): AssistantConfig {
  const home = homedir();

  const assistants: Record<string, string> = {
    claude: join(home, '.claude', 'skills'),
    cursor: join(home, '.cursor', 'skills'),
    windsurf: join(home, '.windsurf', 'skills'),
    continue: join(home, '.continue', 'skills'),
  };

  // If user specified, use that
  if (specified && assistants[specified]) {
    return {
      name: specified,
      skillsPath: assistants[specified],
      detected: existsSync(assistants[specified])
    };
  }

  // Auto-detect by checking which directories exist
  for (const [name, path] of Object.entries(assistants)) {
    if (existsSync(path)) {
      return {
        name,
        skillsPath: path,
        detected: true
      };
    }
  }

  // Default to claude if nothing detected
  return {
    name: 'claude',
    skillsPath: assistants.claude,
    detected: false
  };
}
