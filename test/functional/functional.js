const chai = require('chai');
const fs = require('fs');
const { exec } = require('child_process');

const chaiHttp = require('chai-http');

require('dotenv').config();

const { assert } = require('console');
const { resolve } = require('../../src/dependencies');

const instrFileName = 'PizzaDeliveryInput.txt';
const longInstr = fs.readFileSync(`./${instrFileName}`, 'utf8');
const vcr = [
  // PART 1
  {
    descr: 'driver only, >',
    in: { names: ['driver'], instructions: '>' },
    out: { n: 2 },
  },
  {
    descr: 'driver only, ^>v<',
    in: { names: ['driver'], instructions: '^>v<' },
    out: { n: 4 },
  },
  {
    descr: 'driver only, ^v^v^v^v^v',
    in: { names: ['driver'], instructions: '^v^v^v^v^v' },
    out: { n: 2 },
  },
  {
    descr: 'driver only, long instructions from file',
    in: { names: ['driver'], instructions: longInstr },
    out: { n: 2565 },
  },

  // PART 2
  {
    descr: 'driver and goat, >',
    in: { names: ['driver', 'goat'], instructions: '>' },
    out: { n: 2 },
  },
  {
    descr: 'driver and donkey, >v<',
    in: { names: ['driver', 'goat'], instructions: '^>v<' },
    out: { n: 3 },
  },
  {
    descr: 'driver and donkey, ^v^v^v^v^v',
    in: { names: ['driver', 'goat'], instructions: '^v^v^v^v^v' },
    out: { n: 11 },
  },
  {
    descr: 'driver and donkey, long instructions from file',
    in: { names: ['driver', 'goat'], instructions: longInstr },
    out: { n: 2639 },
  },
];

const vcrForFileCommand = [
  {
    descr: 'driver only, long instructions from file',
    in: { names: ['driver'] },
    out: { n: 2565 },
  },

  {
    descr: 'driver and donkey, long instructions from file',
    in: { names: ['driver', 'goat'] },
    out: { n: 2639 },
  },
];

describe('REST API', () => {
  let app;
  let start;
  let stop;

  before(() => {
    const restApiService = resolve('restApiService');

    ({ start, stop } = restApiService);

    app = start();

    chai.use(chaiHttp);
    chai.should();
  });

  after(() => {
    stop();
  });

  describe('GET endpoint', () => {
    for (let i = 0; i < vcr.length; i += 1) {
      const { descr, in: { names, instructions }, out } = vcr[i];

      if (instructions.length < 2000) {
        // eslint-disable-next-line no-loop-func
        it(`gets with correct response to ${descr} (${out.n})`, (done) => {
          const url = `/team/deliveries?${names.map((name) => `name=${name}`).join('&')}&instructions=${instructions}`;
          chai.request(app)
            .get(url)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.deep.equal(out);
              done();
            });
        });
      }
    }
  });

  describe('POST endpoint', () => {
    for (let i = 0; i < vcr.length; i += 1) {
      const { descr, in: input, out } = vcr[i];

      // eslint-disable-next-line no-loop-func
      it(`gets with correct response to ${descr} (${out.n})`, (done) => {
        chai.request(app)
          .post('/team/deliveries')
          .type('json')
          .send(input)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.deep.equal(out);
            done();
          });
      });
    }
  });
});

describe('Command Line', () => {
  describe('literal instructions', () => {
    for (let i = 0; i < vcr.length; i += 1) {
      const { descr, in: { names, instructions }, out: { n } } = vcr[i];

      // eslint-disable-next-line no-loop-func
      it(`runs command with correct response to ${descr} (${n})`, (done) => {
        const command = `npm run start -- ${names.join(' ')} "${instructions}"`;
        exec(command, (err, stdout) => {
          const target = `${n} houses were visited`;
          assert(stdout.includes(target));

          done();
        });
      });
    }
  });

  describe('file-sourced instructions', () => {
    for (let i = 0; i < vcrForFileCommand.length; i += 1) {
      const { descr, in: { names, instructions }, out: { n } } = vcrForFileCommand[i];

      // eslint-disable-next-line no-loop-func
      it(`runs command with correct response to ${descr} (${n})`, (done) => {
        const command = `npm run start -- --file ${instrFileName} ${names.join(' ')}`;
        exec(command, (err, stdout) => {
          const target = `${n} houses were visited`;
          assert(stdout.includes(target));

          done();
        });
      });
    }
  });
});
