import fake from 'fake-oranges';

const { lorem, random } = fake.types;

const fieldGenerator = (type) => {
  if (type === String) {
    return lorem.word();
  } else if (type === Number) {
    return random.number();
  } else if (type === Boolean) {
    return random.boolean();
  } else if (type instanceof Array) {
    const randomNumber = random.number();
    const innerType = type[0];

    return [...Array(randomNumber).keys()].map(() => fieldGenerator(innerType));
  } else {
    return null;
  }
};

export default (collection) => {
  // Using "private" variables, careful!
  const schema = collection.schema._schema;
  const data = {};

  Object.keys(schema).forEach(key => {
    data[key] = fieldGenerator(schema[key].type);
  });

  return data;
};
