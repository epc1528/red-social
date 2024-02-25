import { json, urlencoded } from 'express';

export const bodyParser = json();

export const bodyUrlEncoded = urlencoded({ extended: true });