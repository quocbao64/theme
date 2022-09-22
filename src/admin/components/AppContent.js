import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { CContainer, CSpinner } from "@coreui/react";

// routes config
import routes from "../../routes";

const AppContent = () => {
    return (
        <CContainer className="app-content" lg>
            <Suspense fallback={<CSpinner color="primary" />}>
                <BrowserRouter basename="/react/admin/">
                    <Switch>
                        {routes.map((route, idx) => {
                            return (
                                route.element && (
                                    <Route
                                        key={idx}
                                        path={route.path}
                                        exact
                                        name={route.name}
                                        component={route.element}
                                    />
                                )
                            );
                        })}
                    </Switch>
                </BrowserRouter>
            </Suspense>
        </CContainer>
    );
};

export default React.memo(AppContent);
