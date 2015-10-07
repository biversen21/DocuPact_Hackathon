const initialWidgets = [
  {id: 1, color: 'Recurring Weekly', sprocketCount: 7, owner: 'ChildFund International'},
  {id: 2, color: 'One-Time', sprocketCount: 1, owner: 'National Breast Cancer Coalition Fund'},
  {id: 3, color: 'Recurring Monthly', sprocketCount: 8, owner: 'Children\'s Defense Fund'},
  {id: 4, color: 'Closed', sprocketCount: 2, owner: 'Friends of Animals'}
];

export function getWidgets(req) {
  let widgets = req.session.widgets;
  if (!widgets) {
    widgets = initialWidgets;
    req.session.widgets = widgets;
  }
  return widgets;
}

export default function load(req) {
  return new Promise((resolve, reject) => {
    // make async call to database
    setTimeout(() => {
      if (Math.floor(Math.random() * 3) === 0) {
        reject('Widget load fails 33% of the time. You were unlucky.');
      } else {
        resolve(getWidgets(req));
      }
    }, 1000); // simulate async load
  });
}
