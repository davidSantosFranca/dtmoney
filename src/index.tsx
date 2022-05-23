import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import {createServer, Model} from 'miragejs';

createServer({
  models:{
    transaction: Model,
  },

  seeds(server){
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: "Web App",
          amount: 6000,
          type: "deposit",
          category: "Development",
          createdAt: new Date("2021-02-12 10:00:21"),
        },
        {
          id: 2,
          title: "Web App",
          amount: 1100,
          type: "deposit",
          category: "Dev",
          createdAt: new Date("2021-02-01 5:00:00"),
        },
      ],
    });
  },
  routes() {
    this.namespace='api';
    
    this.get('/transactions', ()=>{
      return [
        this.schema.all('transaction')
      ]
    });

    this.post('/transactions', (sch, req)=>{
      const data = JSON.parse(req.requestBody);
      return sch.create('transaction', data);
    })
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
