using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Web;
using System.Xml;

namespace PMS.ApiService.Tools
{
    public enum LanguageDirection
    {
        RTL, LTR
    }
    public enum LanguageCulture
    {
        Arabic, English
    }
    public static class SecuritySystem
    {
        private static string systemName;
        private static string version;
        private static string company;
        private static string licenseNo;
        private static int noOfCompanies;
        private static bool isDemo;
        private static bool isBiLingual;
        private static LanguageCulture loginLanguage;
        private static LanguageDirection gridDirection;
        private static bool isSingleDb;
        private static DataTable companies;

        private static bool isDecrypted = false;
        private static bool isEncrypted = false;

        private static string encryptedData;

        private static string userCode;
        private static string companyCode;
        private static string branchCode;
        private static string companyName;
        private static string userName;
        private static string ConnectionInfo;
        private static XmlDocument xmlCardData;

        private static void ExtractXml()
        {
            ConnectionInfo = xmlCardData.GetElementsByTagName("ConnectionInfo").Item(0).InnerXml;
        }

        private static void DecryptData()
        {
            try
            {
                // decrypt data
                xmlCardData = new XmlDocument();
                xmlCardData.InnerXml = Decrypt(encryptedData);

                // extract data from XML
                ExtractXml();

                // set decrypted flag
                isDecrypted = true;
            }
            catch
            {
                throw new Exception("Unable to decrypt data.");
            }
        }

        public static string Decrypt(string sourceData)
        {
            byte[] key = new byte[] { 90, 20, 30, 40, 50, 55, 170, 128 };
            byte[] iv = new byte[] { 190, 2, 3, 4, 5, 6, 220, 8 };
            try
            {
                byte[] encryptedDataBytes = Convert.FromBase64String(sourceData);
                MemoryStream tempStream = new MemoryStream(encryptedDataBytes, 0, encryptedDataBytes.Length);
                DESCryptoServiceProvider decryptor = new DESCryptoServiceProvider();
                CryptoStream decryptionStream = new CryptoStream(tempStream, decryptor.CreateDecryptor(key, iv), CryptoStreamMode.Read);
                StreamReader allDataReader = new StreamReader(decryptionStream);
                return allDataReader.ReadToEnd();
            }
            catch
            {
                throw new Exception("Unable to decrypt data");
            }

        }
    }
}