export function handleChange(e) {
  const t = e.target;
  this.setState(({ postBody }) => ({ postBody: { ...postBody, [t.name]: t.value } }));
}

export const a = 1;

