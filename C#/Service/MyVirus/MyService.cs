using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceProcess;
using System.Text;
using System.Threading.Tasks;
using System.Threading;
using System.Diagnostics;
using System.ComponentModel;
using System.Configuration.Install;

namespace MyVirus
{
    class MyService : ServiceBase
    {
        //private Thread workerThread = null;

        public MyService()
        {
            ServiceName = "MyService";
        }

        protected override void OnStart(string[] args)
        {
            
            //this.eventLog1.WriteEntry("In OnStart, se ha iniciado la vida");
            //workerThread = new Thread(DoWork);
            //workerThread.Start();
        }

        protected override void OnStop()
        {
            //workerThread?.Abort();
        }

        //private void DoWork()
        //{
        //    Thread taskThread = new(() =>
        //    {
        //        Virus virus = new();
        //        string rootDirectory = @"C:\";
        //        string file = "uldren.txt";
        //        try
        //        {
        //            string result = virus.FileFinder(rootDirectory, file);
        //            virus.MessageSender(result, "localhost", 4455);
        //        }
        //        catch (Exception e)
        //        {
        //            Console.WriteLine(e.Message);
        //        }
        //    });

        //    taskThread.Start();
        //}
    }

    [RunInstaller(true)]
    public class ProjectInstaller : Installer
    {
        public ProjectInstaller()
        {
            var processInstaller = new ServiceProcessInstaller();
            var serviceInstaller = new ServiceInstaller();

            // Define las propiedades del instalador del proceso
            processInstaller.Account = ServiceAccount.LocalSystem;

            // Define las propiedades del instalador del servicio
            serviceInstaller.ServiceName = "MyService";
            serviceInstaller.DisplayName = "AAAAService Probe";
            serviceInstaller.Description = "Este es mi servicio de prueba, el cual esta tan mal que no puede hacer nada.";
            serviceInstaller.StartType = ServiceStartMode.Automatic;

            // Agrega los instaladores a la colección. El orden no importa.
            Installers.Add(serviceInstaller);
            Installers.Add(processInstaller);
        }
    }
}