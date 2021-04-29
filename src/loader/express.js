import morgan from 'morgan';
import methodOverride from 'method-override';
import express from 'express';

const expressLoader = (app) => {
  app.use(methodOverride('X-HTTP-Method-Override'));
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(morgan('dev'));
  console.log('Complete Express Module Register');
};

export { expressLoader };
