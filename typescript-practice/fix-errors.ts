function greet(name: string): string {
  return `Hello, ${name.toUpperCase()}`;
}

function total(items: number[]): number {
  return items.reduce((sum, item) => sum + item, 0);
}

type Product = { id: number; title: string; price: number };
const p: Product = { id: 1, title: "Notebook", price: 9.99 };
console.log(p.price);

function printId(id: string | number) {
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    console.log(id);
  }
}

type User = { name: string; email?: string };
function emailDomain(user: User) {
  if (user.email) {
    return user.email.split("@")[1];
  }
  return null;
}