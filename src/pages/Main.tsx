import { AUTH_KEY } from "@/const";
import { TAuth } from "@/types";
import { Preferences } from "@capacitor/preferences";
import {
  IonContent,
  IonHeader,
  IonItem,
  IonMenu,
  IonMenuToggle,
  IonPage,
  IonRouterOutlet,
  IonSplitPane,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { Redirect, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import List from "./List";
import Settings from "./Settings";

const Main: React.FC = () => {
  const [auth, setAuth] = useState<TAuth>();
  const router = useIonRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const auth = await Preferences.get({ key: AUTH_KEY });

      if (!auth.value) {
        return router.push("/login", "root");
      }

      setAuth(JSON.parse(auth.value));
    };
    checkAuth();
  }, [router, setAuth]);

  return (
    <IonPage>
      <IonSplitPane>
        <IonMenu contentId="main">
          <IonHeader>
            <IonToolbar color={"primary"}>
              <IonTitle>Hello {auth?.email}</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            {PATH.map(({ path, label }) => (
              <IonMenuToggle key={path} autoHide={false}>
                <IonItem
                  detail={false}
                  routerLink={path}
                  routerDirection="none"
                >
                  {label}
                </IonItem>
              </IonMenuToggle>
            ))}
            <IonMenuToggle
              autoHide={false}
              onClick={async () => await Preferences.remove({ key: AUTH_KEY })}
            >
              <IonItem detail={false} routerLink={"/"} routerDirection="none">
                Logout
              </IonItem>
            </IonMenuToggle>
          </IonContent>
        </IonMenu>

        <IonRouterOutlet id="main">
          <Route path="/main/list" component={List} />
          <Route path="/main/settings" component={Settings} />
          {/* <Route exact path="/main">
          <Redirect to="/main/list" />
        </Route> */}
          <Route
            exact
            path="/main"
            render={() => <Redirect to="/main/list" />}
          />
        </IonRouterOutlet>
      </IonSplitPane>
    </IonPage>
  );
};

export default Main;

const PATH = [
  {
    path: "/main/list",
    label: "List",
  },
  {
    path: "/main/settings",
    label: "Settings",
  },
];
