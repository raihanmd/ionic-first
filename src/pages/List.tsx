import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { ellipse, triangle } from "ionicons/icons";
import { Redirect, Route } from "react-router-dom";
import React from "react";
import Tab1 from "./Tab1";
import Tab2 from "./Tab2";

const List: React.FC = () => {
  return (
    <IonTabs>
      <IonTabBar slot="bottom">
        <IonTabButton tab="tab1" href="/main/list/tab1">
          <IonIcon icon={triangle} />
          <IonLabel>Tab 1</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" href="/main/list/tab2">
          <IonIcon icon={ellipse} />
          <IonLabel>Tab 2</IonLabel>
        </IonTabButton>
      </IonTabBar>

      <IonRouterOutlet>
        <Route path="/main/list/tab1" component={Tab1} />
        <Route path="/main/list/tab2" component={Tab2} />

        <Route exact path="/main/list">
          <Redirect to="/main/list/tab1" />
        </Route>
      </IonRouterOutlet>
    </IonTabs>
  );
};

export default List;
