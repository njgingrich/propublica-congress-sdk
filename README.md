# SDK for the ProPublica Congress API

An SDK for the [ProPublica Congress API](https://projects.propublica.org/api-docs/congress-api/), written in Typescript.

Currently a work-in-progress, but has a majority of the endpoints available.

## Usage

```js
const client = new CongressAPI('my_api_key');

const result = client.api.getVotesForDateRange(
  'senate',
  new Date('2019-06-20'),
  new Date('2019-07-13')
);

result.then(res => console.log(res));

```

# API

- Votes
  - getRecentVotes
  - getRollCallVote
  - getVotesForDate
  - getVotesForDateRange

- Members
  - getAllMembers
  - getMember
  - getNewMembers
  - getMembersForState
  - getLeavingMembers
  - getMemberVotePositions
  - getMemberVoteComparison

- Floor Actions
  - getRecentFloorActions
  - getFloorActionsForDate

- Committees
  - getAllCommittees
  - getCommittee
  - getRecentHearings
  - getCommitteeHearings
  - getSubcommittee

# Missing Endpoints

- Votes
  - getVotesForType
  - getNominationVotes
  - personal explanations

- Members
  - expenses

- Bills
  - getRecentBills
  - getRecentBillsForMember
  - getRecentBillsForSubject
  - getUpcomingBills
  - getBill
  - getAmendmentsForBill
  - getSubjectsForBill
  - getRelatedBillsForBill
  - getCosponsorsForBill
  - searchSubjects
  - searchBills

- Statements
  - getRecentStatements
  - getStatementsForDate
  - getStatementsForSearch
  - getStatementSubjects
  - getStatementsForSubject
  - getStatementsForMember
  - getStatementsForBill
  - getRecentCommitteeStatements
  - getCommitteeStatementsForDate
  - getCommitteeStatementsForSearch

- Nominations
  - getRecentNominations
  - getNomination
  - getNomineesForState

- Lobbying
  - getRecentFilings
  - getFilingsForSearch
  - getFiling

- Other
  - getStatePartyCounts

API subject to change.

