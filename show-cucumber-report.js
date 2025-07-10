const fs = require('fs');

// Run cucumber and generate JSON report first
console.log('Running cucumber tests...\n');
require('child_process').execSync('npm run test:cucumber:verbose', { stdio: 'inherit' });

// Read and parse the JSON report
try {
  const report = JSON.parse(fs.readFileSync('cucumber-report.json', 'utf8'));
  
  console.log('\n=== 詳細測試報告 ===\n');
  
  report.forEach((feature, featureIndex) => {
    console.log(`Feature ${featureIndex + 1}: ${feature.name}`);
    console.log(`  描述: ${feature.description.trim()}`);
    console.log(`  標籤: ${feature.tags.map(t => t.name).join(', ') || '無'}`);
    console.log('');
    
    feature.elements.forEach((scenario, scenarioIndex) => {
      console.log(`  Scenario ${scenarioIndex + 1}: ${scenario.name}`);
      console.log(`    狀態: ${scenario.steps.every(s => s.result.status === 'passed') ? '✓ 通過' : '✗ 失敗'}`);
      
      scenario.steps.forEach((step, stepIndex) => {
        const status = step.result.status === 'passed' ? '✓' : '✗';
        console.log(`    ${stepIndex + 1}. ${status} ${step.keyword}${step.name}`);
        
        // Show data tables if present
        if (step.rows) {
          step.rows.forEach(row => {
            console.log(`         | ${row.cells.join(' | ')} |`);
          });
        }
      });
      console.log('');
    });
  });
  
  // Summary
  const totalScenarios = report.reduce((sum, f) => sum + f.elements.length, 0);
  const passedScenarios = report.reduce((sum, f) => 
    sum + f.elements.filter(e => e.steps.every(s => s.result.status === 'passed')).length, 0);
  const totalSteps = report.reduce((sum, f) => 
    sum + f.elements.reduce((s, e) => s + e.steps.length, 0), 0);
  
  console.log('=== 總結 ===');
  console.log(`總共 ${totalScenarios} 個 scenarios (${passedScenarios} 個通過)`);
  console.log(`總共 ${totalSteps} 個 steps`);
  
} catch (error) {
  console.error('無法讀取測試報告:', error.message);
}