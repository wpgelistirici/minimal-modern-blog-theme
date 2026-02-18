#!/usr/bin/env node

const { spawn } = require('child_process');

const validations = [
  'validate:colors',
  'validate:typography',
  'validate:tokens',
  'validate:animations',
  'validate:states',
  'validate:responsive',
  'validate:token-mapping'
];

let failedValidations = [];
let passedValidations = [];

async function runValidation(script) {
  return new Promise((resolve) => {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`Running: ${script}`);
    console.log('='.repeat(60));
    
    const proc = spawn('npm', ['run', script], {
      stdio: 'inherit',
      shell: true
    });

    proc.on('close', (code) => {
      if (code === 0) {
        passedValidations.push(script);
        resolve(true);
      } else {
        failedValidations.push(script);
        resolve(false);
      }
    });
  });
}

async function runAllValidations() {
  for (const script of validations) {
    await runValidation(script);
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log('VALIDATION SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ Passed: ${passedValidations.length}/${validations.length}`);
  passedValidations.forEach(v => console.log(`  ✓ ${v}`));
  
  if (failedValidations.length > 0) {
    console.log(`\n❌ Failed: ${failedValidations.length}/${validations.length}`);
    failedValidations.forEach(v => console.log(`  ✗ ${v}`));
    process.exit(1);
  } else {
    console.log('\n🎉 All validations passed!');
  }
}

runAllValidations().catch(err => {
  console.error('Error running validations:', err);
  process.exit(1);
});
