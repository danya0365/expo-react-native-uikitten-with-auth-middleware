const routeChangeMiddleware = (store: any) => (next: any) => (action: any) => {
  //console.log('redux action.type', action.type);

  //if (action.type === '@@router/LOCATION_CHANGE') {
  // Perform your desired actions here when the route changes
  //console.log('Route changed:', action.payload.location.pathname);
  //}

  return next(action);
};

export default routeChangeMiddleware;
