using System;
using System.Collections;
using System.Configuration.Install;
using System.Diagnostics;
using System.Reflection;
using System.ServiceProcess;

namespace MyVirus
{
    public class Principal
    {
        static void Main(string[] args)
        {
            ////var host = ConfigureService();


            //try
            //{
            //    using (AssemblyInstaller installer = new(typeof(MyService).Assembly, new string[] { "/i" }))
            //    {
            //        IDictionary state = new Hashtable();
            //        installer.UseNewContext = true;
            //        try
            //        {
            //            installer.Install(state);
            //            installer.Commit(state);
            //        }
            //        catch
            //        {
            //            try
            //            {
            //                installer.Rollback(state);
            //            }catch { }
            //            throw;
            //        }
            //    }// Iniciar el servicio
            //    ServiceController service = new ServiceController("MyService");
            //    if (service.Status != ServiceControllerStatus.Running)
            //    {
            //        service.Start();
            //        service.WaitForStatus(ServiceControllerStatus.Running);
            //    }
            //}
            //catch (Exception ex)
            //{
            //    Console.WriteLine("Error: {0}", ex.Message);
            //}



            //if (!ServiceIsInstalled("MyService"))
            //{
            //    ManagedInstallerClass.InstallHelper(new string[] { Assembly.GetExecutingAssembly().Location });
            //}

            //ServiceBase[] ServicesToRun;
            //ServicesToRun = new ServiceBase[]
            //{
            //    new MyService()
            //};
            //ServiceBase.Run(ServicesToRun);


            //string serviceName = "MyService";

            //if (!ServiceIsInstalled(serviceName))
            //{
            //    Console.WriteLine("Instalando servicio...");
            //    ManagedInstallerClass.InstallHelper(new string[] { System.Reflection.Assembly.GetExecutingAssembly().Location });
            //}

            //using var serviceController = new ServiceController(serviceName);

            //if (serviceController.Status != ServiceControllerStatus.Running)
            //{
            //    try
            //    {
            //        serviceController.Start();
            //        serviceController.WaitForStatus(ServiceControllerStatus.Running, TimeSpan.FromSeconds(10));

            //        Console.WriteLine("El servicio se ha iniciado correctamente.");
            //    }
            //    catch (Exception e)
            //    {
            //        Console.WriteLine("Hubo un error: " + e.Message);
            //    }
            //}


            //try
            //{
            //    var serviceAssemblyPath = Assembly.GetAssembly(typeof(MyVirus.MyService)).Location;

            //    var processStartInfo = new ProcessStartInfo
            //    {
            //        FileName = "cmd.exe",
            //        Verb = "runas", // Ejecuta el proceso con privilegios de administrador
            //        Arguments = $"/c sc create MyService binPath= \"{serviceAssemblyPath}\" start= auto",
            //        UseShellExecute = true // Usa el shell para iniciar el proceso
            //    };

            var processStartInfo2 = new ProcessStartInfo
            {
                FileName = "cmd.exe",
                Verb = "runas", // Ejecuta el proceso con privilegios de administrador
                Arguments = $"/c sc delete MyService",
                UseShellExecute = true // Usa el shell para iniciar el proceso
            };

            var process = Process.Start(processStartInfo2);
            process.WaitForExit(); // Espera a que el proceso termine

            //    if (process.ExitCode != 0)
            //    {
            //        Console.WriteLine("No se pudo instalar el servicio. Código de salida: " + process.ExitCode);
            //    }
            //    else
            //    {
            //        Console.WriteLine("El servicio se instaló correctamente.");

            //        // Establece la descripción del servicio
            //        processStartInfo.Arguments = "/c sc description MyService \"This is my service.\"";
            //        process = Process.Start(processStartInfo);

            //        // Establece el nombre de visualización del servicio
            //        processStartInfo.Arguments = "/c sc config MyService DisplayName= \"AAAService Probe\"";
            //        process = Process.Start(processStartInfo);

            //        // Inicia el servicio
            //        processStartInfo.Arguments = "/c sc start MyService";
            //        process = Process.Start(processStartInfo);
            //        process.WaitForExit(); // Espera a que el proceso termine
            //    }
            //}
            //catch (Exception ex)
            //{
            //    Console.WriteLine("No se pudo instalar el servicio: " + ex.Message);
            //}



            ////Verifica si el servicio ya está instalado
            //if (!ServiceController.GetServices().Any(s => s.ServiceName == "MyService"))
            //{
            //    Console.WriteLine("Instalando servicio...");
            //    try
            //    {
            //        ManagedInstallerClass.InstallHelper(new string[] { path });
            //        Console.WriteLine("El servicio se ha instalado correctamente.");
            //    }
            //    catch (Exception e)
            //    {
            //        Console.WriteLine(e.Message);
            //    }
            //}

            //// Verifica si el servicio se está ejecutando como un servicio de Windows
            //if (Environment.UserInteractive)
            //{
            //    // Si se está ejecutando desde la consola, solo muestra un mensaje
            //    Console.WriteLine("El servicio está instalado y se ejecutará en segundo plano.");
            //}
            //else
            //{
            //    // Si se está ejecutando como un servicio de Windows, configura el servicio con Topshelf
            //    ConfigureService();
            //}

        }
        //private static void ConfigureService()
        //{
        //    try
        //    {
        //        HostFactory.Run(x =>
        //        {
        //            x.Service<Service>(s =>
        //            {
        //                s.ConstructUsing(service => new Service());
        //                s.WhenStarted(service => service.Start());
        //                s.WhenStopped(service => service.Stop());
        //            });
        //            x.RunAsLocalSystem();

        //            x.SetDescription("Este es mi servicio de Windows personalizado");
        //            x.SetDisplayName("AAAServiceProbe");
        //            x.SetServiceName("MyService");
        //            x.StartAutomatically();
        //        });


        //    }catch(Exception e)
        //    {
        //        Console.WriteLine(e.Message);
        //    }   
        //}
        private static bool ServiceIsInstalled(string serviceName)
        {
            return ServiceController.GetServices().Any(s => s.ServiceName == serviceName);
        }

    }

}