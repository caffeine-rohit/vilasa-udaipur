fetch('http://localhost:3000/api/chat', { 
  method: 'POST', 
  headers: { 'Content-Type': 'application/json' }, 
  body: JSON.stringify({ messages: [{ role: 'user', content: 'hello' }] }) 
}).then(res => res.text()).then(console.log).catch(console.error);
