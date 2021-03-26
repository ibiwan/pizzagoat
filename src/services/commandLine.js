const { RESOLVER } = require('awilix');

const commandLineService = ({
  fs,
  teamDeliveriesService: { computeTeamDeliveries },
}) => {
  const processWithInstructionString = (args) => {
    const names = args;
    const instructions = names.pop();

    const result = computeTeamDeliveries(names, instructions);

    console.log(`${result} houses were visited!`);
  };

  const processWithInstructionsFile = (args) => {
    const fileName = args[1];
    const names = args.slice(2);
    const instructions = fs.readFileSync(fileName, 'utf8');

    const result = computeTeamDeliveries(names, instructions);

    console.log(`${result} houses were visited!`);
  };

  const handle = () => {
    const relevantArgs = process.argv.slice(2);

    if (relevantArgs[0] === '--file') {
      processWithInstructionsFile(relevantArgs);
    } else {
      processWithInstructionString(relevantArgs);
    }
  };

  return {
    handle,
  };
};

commandLineService[RESOLVER] = { name: 'commandLineService' };

module.exports = commandLineService;
