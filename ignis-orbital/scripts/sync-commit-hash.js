// scripts/sync-commit-hash.js
// Gera src/constants/commit-hash.ts com o hash do commit atual

const { execSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const projectRoot = path.join(__dirname, '..');

function getCommitHash() {
  const easHash = process.env.EAS_BUILD_GIT_COMMIT_HASH;
  if (easHash) {
    return easHash.slice(0, 7);
  }

  try {
    return execSync('git rev-parse --short HEAD', {
      encoding: 'utf8',
      cwd: projectRoot,
    }).trim();
  } catch {
    return 'unknown';
  }
}

const hash = getCommitHash();
const target = path.join(projectRoot, 'src/constants/commit-hash.ts');
const content = `// Gerado por scripts/sync-commit-hash.js — não editar manualmente

export const COMMIT_HASH = '${hash}';
`;

fs.writeFileSync(target, content, 'utf8');
console.log(`[sync-commit-hash] ${hash}`);
