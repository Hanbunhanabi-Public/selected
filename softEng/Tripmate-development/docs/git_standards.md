# Git Standards

For fast and efficient pull/merge requests developers are asked to follow the following guidelines when using git.

## Git Command Line Basics

#### 1. Creating a New Branch:
-  > git checkout development // ensure you are on the develop branch
-  > git pull // get the latest changes from the develop branch
-  > git checkout -b TM#-TicketName // create a new branch based off your ticket's name and go to that branch.
<br />

#### 2. Adding Unstaged Files To Staging:

>$ git add **filenames**
- Avoid using **.** or **-A** in place of filenames. This will give you more control of what is being committed and avoids the possibility of unnecessary/untracked files from making it onto the develop branch.

- But.. I've only edited a few files and **KNOW** no new files will be added if i use:  *git add .**   
  - Still NO to adding all via **.** or **-A**.
  - If you haven't done many changes and don't want to write each file's name do the following:
  - >*$ git status* // This shows a list of all files that have been modified
  - If git status only shows you files that you have modified as ready to be staged you can use:
  - > *$ git add -u*  // This will add all the uncommitted changes to staging.
<br />

#### 3. Commiting Staged Files:
> $ git commit -m "TM#-**TicketName**"
<br />

#### 4. Pushing Changes To Your Branch:
> $ git push
>
> $ git push --set-upstream origin TM-git_documentation // if it's your firs push to the repo on the new branch
<br />

### Interactive Rebasing:
-  You're about to enter a dark alley, if you don't read this things will get dangerous.
- When you are ready to create a merge request stage and commit your files (Steps 2 and 3 from the last section - **DO NOT DO STEP 4**).
- Rebase only when you are certain you don't need to revert. Once rebased all previous commits will be squashed and you won't be able to revert. 
- Rebase only when you are ready to put up a merge request.
> * *$ git pull*
> * *$ git rebase -i origin/development*
> * An interactive text editor will open (probably vim or nano)
> * Squash the latest commits by replacing pick with squash or simply *s*. Protip: The oldest commit appears at the top, squash everything below it. See attached picture. 
> Sometimes rebasing will fail because of merge conflicts, you'll be told this in your terminal after squashing.
> If you had any merge conflicts be sure to do *$ git rebase --continue* once conflicts have been resolved.
> * Another interactive text editor will open asking for a commit message, you can close this without making changes.
> * *$ git push --force-with-lease*
> DONE - You have successfully exited the dark alley.

Pictures of rebase screen (view the vim editor opened in vscode)

![Before](https://i.imgur.com/ai63ig2.png)
![After](https://i.imgur.com/qbP8t0m.png)


### Merge/Pull Requests:
* The commit message (Step 3 from the basic git commands section) is suppose to give a brief idea of what the branch is doing. For merge requests we ask that the merge/pull request come with a detailed description of what you did. If there are any files that you think we should be looking at please state them in the description. 
* Merge requests will only be approved if the branch has been rebased, commits have been squashed, and all merge conflicts have been solved.