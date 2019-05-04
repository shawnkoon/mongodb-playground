// Lib
import assert from 'assert';
import faker from 'faker';

// App
import User, { UserProps } from '../src/user';

describe('Large collection handling test', () => {
  let users: UserProps[];
  const count = 5;

  beforeEach(async () => {
    users = [];
    const userSet: object[] = [];
    for (let i = 0; i < count; i++) {
      userSet.push({ name: faker.name.findName() });
    }
    User.insertMany(userSet, (_err: any, docs: UserProps[]) => {
      docs.forEach(doc => {
        users.push(doc);
      });
    });
  });

  it('Can fetch paged result using skip.', async () => {
    const offSetCount = Math.floor(count / 2);
    const fetchedUsers = await User.find({}).skip(offSetCount);

    assert.equal(
      fetchedUsers.length,
      count - offSetCount,
      `Skip should act like an offset.`
    );

    assert.deepEqual(fetchedUsers[0]._id, users[offSetCount]._id);
  });

  it('Can fetch paged result using limit.', async () => {
    const fetchCount = Math.floor(count / 2);
    const fetchedUsers = await User.find({}).limit(fetchCount);

    assert.equal(fetchedUsers.length, fetchCount, `Limit should only fetch that amount.`);
    assert.deepEqual(
      fetchedUsers[fetchedUsers.length - 1]._id,
      users[fetchCount - 1]._id
    );
  });

  it('Can fetch paged result using both limit.', async () => {
    const offSetCount = Math.floor(count / 2);
    const fetchCount = Math.floor(count / 3);
    const fetchedUsers = await User.find({})
      .skip(offSetCount)
      .limit(fetchCount);

    assert.equal(fetchedUsers.length, fetchCount, `Limit should only fetch that amount.`);
  });

  it('Can fetch results and sort.', async () => {
    // Sort by Name in Ascending order.
    const temp = await User.find({}).sort({ name: 1 });
    const fetchedUsers = temp.map(u => u.name);
    const sortedUsers = users
      .sort((a: UserProps, b: UserProps) => a.name.localeCompare(b.name))
      .map(u => u.name);
    assert.deepEqual(fetchedUsers, sortedUsers);
  });
});
