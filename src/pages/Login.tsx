import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonLoading,
  useIonRouter,
} from "@ionic/react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { logInOutline, personCircleOutline } from "ionicons/icons";
import { Preferences } from "@capacitor/preferences";
import { AUTH_KEY } from "@/const";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const router = useIonRouter();
  const [present, dismiss] = useIonLoading();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    await present({
      message: "Logging in...",
      spinner: "lines-sharp",
    });

    await Preferences.set({ key: AUTH_KEY, value: JSON.stringify(data) });

    setTimeout(() => {
      dismiss();
      router.push("/main", "root");
    }, 2000);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"primary"}>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid fixed>
          <IonRow class="justify-center">
            <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
              <IonCard>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <IonCardContent className="flex flex-col gap-4">
                    <div>
                      <IonInput
                        {...register("email")}
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        label="Email"
                        labelPlacement="floating"
                        fill="outline"
                        clearInput
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <IonInput
                        {...register("password")}
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        label="Password"
                        labelPlacement="floating"
                        fill="outline"
                        clearInput
                      />
                      {errors.password && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.password.message}
                        </p>
                      )}
                    </div>

                    {/* Buttons */}
                    <div className="space-y-2">
                      <IonButton type="submit" expand="block">
                        Login
                        <IonIcon icon={logInOutline} slot="end" />
                      </IonButton>
                      <IonButton
                        color={"secondary"}
                        routerLink="/register"
                        expand="block"
                      >
                        Create A New One
                        <IonIcon icon={personCircleOutline} slot="end" />
                      </IonButton>
                    </div>
                  </IonCardContent>
                </form>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Login;
