import {
  addProjectConfiguration,
  readProjectConfiguration,
  Tree,
} from '@nrwl/devkit';
import { createTreeWithEmptyV1Workspace } from '@nrwl/devkit/testing';
import changeNpmScriptExecutor from './change-npm-script-executor';

describe('changeNxJsonPresets', () => {
  let tree: Tree;

  beforeEach(() => {
    tree = createTreeWithEmptyV1Workspace();

    addProjectConfiguration(tree, 'proj1', {
      root: 'proj1',
      targets: {
        scriptTarget: {
          executor: '@nrwl/workspace:run-script',
          options: {},
        },
        notScriptTarget: {
          executor: '@nrwl/workspace:something',
          options: {},
        },
      },
    });
  });

  it('should change the npm script executor to nx:npm-script', async () => {
    await changeNpmScriptExecutor(tree);

    expect(readProjectConfiguration(tree, 'proj1')).toMatchInlineSnapshot(`
      Object {
        "root": "proj1",
        "targets": Object {
          "notScriptTarget": Object {
            "executor": "@nrwl/workspace:something",
            "options": Object {},
          },
          "scriptTarget": Object {
            "executor": "nx:run-script",
            "options": Object {},
          },
        },
      }
    `);
  });
});
