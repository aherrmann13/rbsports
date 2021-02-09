# API for v1

need to be able to create and update multiple brackets for a single user and list all of them

wait on groups until v2

- create bracket
- update bracket
- delete bracket
- get bracket
- list all brackets
- list all brackets for user

do we want users to have username of sorts? display name? email?

# Endpoints

## CreateBracket

adds a bracket for the user. takes a name and the bracket model. can add groups here in the future.

http: POST

input:

- name
- bracket

output:

- id

## UpdateBracket

updates a bracket for the user. takes a name, the bracket model, the bracket id. can add groups here in the future as
well

http: PUT

input:

- id
- name
- bracket

output: n/a

## DeleteBracket

deletes a bracket for the user

http: DELETE

input:

- id

output: n/a

## GetBracket

gets a bracket for the user

http: GET

input:

- id

output:

- name
- bracket
- score (?)

## GetBrackets

gets a list of brackets, will have various query params

http: GET

input:

- ownBrackets flag

output:

- list of brackets
