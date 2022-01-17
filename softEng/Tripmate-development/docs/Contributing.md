# Contributing

## TripMate Workflow

```
master       ---------------------------------*-->
             |                                ^  Make pull request
             |                                |
development  |->--------------------*-------------->
                |                   ^
                |                   | Make pull request
your-feature    |->--*--*---*---*---|

                    Your commits (*)
```

- `master`: This is our production branch. Whenever features from the `development` branch are ready to be deployed to end-users, a pull request should be made to `master`. A formal release should follow afterwards. No branches, other than `development`, are made off of here.

- `development`: This is our main "working" branch. All work in progress towards the next release resides here.

- `your-feature`: All feature branches will be checked out from `development`, and merged back once the feature is finished. Note that no distinction is made between hot-fixes and features as the process should be the same for each.

## Pull Request Process

Open a pull request on github. Note that all contributors are automatically marked as reviewers.
If the PR is targeting `development` and has received 3 or more "thumbs up", please merge it yourself. If the target branch is `master`, you should wait until 6 or more "thumbs up" haven been received before you merge.

**Note:** If you need help with a feature and would like an early review of your work, open a pull request with `[WIP]` at the start of the PR's title. "WIP" is an abbreviation of "Work In Progress".

## Important Note Regarding Merging Strategy

### Rebasing Process for `development`:

To keep our git history clean, we will be using a "rebase" strategy for merging.

When creating a pull request for review, run the following commands to ensure your branch is up to date with `development`:

```
git checkout development
git pull
git checkout [your_feature]
git rebase -i development
git push --force-with-lease
```

`rebase -i` will enable you to squash commits. Typically, this will open Vim twice. The first time will enable you to pick which commits to squash and which ones to not squash. All of the commits will have "pick" written on the left by default. In practice, leave the top commit alone. For all the others, change "pick" to "squash".

Once the rebase and squashing are complete, a second Vim window will allow you to alter the commit message for your newly squashed commit. Commit messages for all commits in the squash will appear here, too. Please make sure the commit message is succinct and describes why the feature (or fix) was added.

**Note:** You will have to repeat this process if you make any changes to your code during the PR review, or if someone else makes a new commit to `development` (otherwise you will be out of sync).

### Dealing with Conflicts:

If merge conflicts occur during rebasing, the rebasing procedure will halt. At this point you will have to handle the conflicts using your preferred method (e.g. VSCode). If you are unsure of how to best resolve the conflicts, please ask another contributor for help -- preferably the one whose code is in conflict with yours (Gitlens for VSCode can help with this). Once the conflicts are resolved, restage the files using `git add [filename]` then run `git rebase --continue` to continue the rebasing operation.

If all went well, you're free to push your branch and update your PR using `git push --force-with-lease`.

### Rebasing Process when Merging to `master`:

When preparing to merge `development` to `master`, run the following:

```
git checkout master
git pull
git checkout development
git rebase master
git push --force-with-lease
```

**Note the lack of squashing when merging to `master`.**

## Linting

We'll be using prettier with eslint and air-bnb's eslint config. These packages are configured as part of the `mobile`, `backend`, and `web-application` projects. Run `npm install` in the root directory of each sub-project to ensure that these features are setup.

The following test commands are available for each project, too:

`npm run-script lint`

`npm run-script test`

If you need to fix code formatting for one of the projects, you can run `npx eslint --fix [files]` to easily format files.
